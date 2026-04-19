import React, { useEffect, useRef, useState, useMemo } from 'react';
import Matter from 'matter-js';
import { ShoppingCart, Search, Dumbbell, Zap, Target, Shield, Heart, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GravityHero = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const navigate = useNavigate();
    const [bodies, setBodies] = useState([]);

    // Decorative icons for background physics - users can play with these
    const decorativeIcons = useMemo(() => [
        { id: 101, icon: <Dumbbell size={32} className="text-primary/40" />, width: 60, height: 60 },
        { id: 102, icon: <Heart size={32} className="text-red-500/30" />, width: 60, height: 60 },
        { id: 103, icon: <Target size={32} className="text-blue-500/30" />, width: 60, height: 60 },
        { id: 104, icon: <Shield size={32} className="text-green-500/30" />, width: 60, height: 60 },
        { id: 105, icon: <Zap size={32} className="text-yellow-500/30" />, width: 60, height: 60 },
        { id: 106, icon: <Activity size={32} className="text-primary/40" />, width: 60, height: 60 },
        { id: 107, icon: <Dumbbell size={48} className="text-gray-500/20" />, width: 80, height: 80 },
    ], []);

    useEffect(() => {
        const engine = engineRef.current;
        const world = engine.world;
        
        // Very subtle upward drift for anti-gravity
        world.gravity.y = -0.05; 
        
        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent'
            }
        });

        // Invisible boundaries
        const wallThickness = 100;
        const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + wallThickness / 2, window.innerWidth, wallThickness, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(window.innerWidth / 2, -wallThickness / 2, window.innerWidth, wallThickness, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(-wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(window.innerWidth + wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, { isStatic: true });

        Matter.World.add(world, [ground, ceiling, leftWall, rightWall]);

        const newBodies = decorativeIcons.map((item) => {
            const x = Math.random() * (window.innerWidth - 100) + 50;
            const y = Math.random() * (window.innerHeight - 100) + 50;
            const body = Matter.Bodies.rectangle(x, y, item.width, item.height, {
                restitution: 0.8,
                friction: 0.05,
                render: { visible: false } 
            });
            return { ...item, body };
        });

        Matter.World.add(world, newBodies.map(b => b.body));

        // Add some mouse control for interactive play
        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1,
                render: { visible: false }
            }
        });
        Matter.World.add(world, mouseConstraint);

        Matter.Runner.run(engine);
        setBodies(newBodies);

        const update = () => {
            setBodies(prev => [...prev]);
            requestAnimationFrame(update);
        };
        const animId = requestAnimationFrame(update);

        return () => {
            Matter.World.clear(world);
            Matter.Engine.clear(engine);
            cancelAnimationFrame(animId);
        };
    }, [decorativeIcons]);

    return (
        <div ref={sceneRef} className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-dark-dark flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[160px]"></div>
            </div>

            {/* STATIC HERO CONTENT - Fixed and easy to use */}
            <div className="z-20 text-center max-w-4xl px-6 pointer-events-none">
                <div className="mb-6 pointer-events-auto inline-block px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.3em] animate-pulse">
                    The Future of Fitness
                </div>
                
                <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tighter text-white leading-[0.9]">
                    GRAVITY IS <span className="text-primary italic block md:inline">OPTIONAL.</span>
                </h1>
                
                <p className="text-gray-400 text-lg md:text-2xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                    Premium professional-grade equipment engineered for those who demand elite performance without limits.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pointer-events-auto">
                    <button 
                        onClick={() => navigate('/shop')}
                        className="px-10 py-5 bg-primary text-dark-dark rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl shadow-primary/20 flex items-center gap-3 group"
                    >
                        <ShoppingCart size={18} /> OPEN CATALOG
                    </button>
                    
                    <div className="relative glass-morphism rounded-2xl flex items-center px-6 py-5 border border-white/10 w-full md:w-80 group focus-within:border-primary/50 transition-all">
                        <Search size={18} className="text-gray-500 mr-3 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="SEARCH EQUIPMENT..." 
                            className="bg-transparent border-none outline-none text-xs font-bold text-white w-full uppercase tracking-widest placeholder-gray-600"
                        />
                    </div>
                </div>
            </div>

            {/* DECORATIVE PHYSICS NODES - Interactive background */}
            {bodies.map((el) => (
                <div
                    key={el.id}
                    className="gravity-node absolute pointer-events-auto transition-opacity hover:opacity-100 opacity-60"
                    style={{
                        left: el.body.position.x - el.width / 2,
                        top: el.body.position.y - el.height / 2,
                        transform: `rotate(${el.body.angle}rad)`,
                        width: el.width,
                        height: el.height,
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-125 transition-transform duration-500">
                        {el.icon}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GravityHero;
