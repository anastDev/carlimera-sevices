import type {Car} from "@/types/typesCar.ts";

export const cars: Car[] = [
    {
        id: "fiat500c-2011",
        brand: "Fiat",
        model: "500C",
        year: 2011,
        price: 1100,
        mileage: 13000,
        transmission: "automatic",
        fuelType: "gasoline",
        topSpeed: 155,
        bodyType: "Hatchback / Convertible",
        location: "Coventry, United Kingdom",
        title: "2011 Fiat 500C [Lounge / TwinAir Trim] – Chic & Economical Urban Convertible",
        engine: "875cc (0.9L) TwinAir Turbocharged 2-Cylinder Petrol Engine",
        drivetrain: "FWD (Front-Wheel Drive)",
        exteriorColor: "Dark Blue",
        interiorColor: "Cream / Ivory Ambience Cloth Trim",
        images: [
            "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=1200", // Placeholder dark blue car
            "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200"
        ],
        description: "Embrace the timeless charm of Italian design with this beautifully presented 2011 Fiat 500C. This iconic city car seamlessly blends retro heritage with modern metropolitan agility, making it the perfect companion for navigating tight city streets or cruising down coastal lanes. Featuring its distinct, premium canvas roll-back convertible roof, this 500C allows you to enjoy open-top motoring at the touch of a button. Beyond its charismatic aesthetics, it is incredibly economical to run, easy to park, and offers an surprisingly spirited driving experience. Its compact footprint hides a clever, driver-focused cabin that ensures every journey is packed with personality and fun.",
        features: [
            "Power Convertible Canvas Roof: Retractable multi-stage canvas roof with integrated glass rear window.",
            "Eco-Friendly Performance: Powered by Fiat’s award-winning TwinAir engine, engineered for low carbon emissions.",
            "Signature Chrome Styling: High-gloss chrome bumper inserts, mirror caps, and vintage-inspired door handles.",
            "Multi-Spoke Alloy Wheels: Elegant multi-spoke radial alloy wheels featuring a central Fiat hub accent.",
            "City Parking Mode: Ultra-light power steering toggle designed to make parallel parking effortless."
        ],
        conditionText: "The vehicle's dark blue paintwork displays an excellent deep gloss finish across the bonnet and front fascia panels. The iconic circular headlamps and lower daytime running lights present clear and free of clouding or moisture haze. The intricate front lower grille and classic chrome bumper trim appear well-aligned, showing minimal signs of standard road wear. The factory alloy wheels look structurally sound and complete."
    },
    {
        id: "qashqai-2018",
        brand: "Nissan",
        model: "Qashqai",
        year: 2018,
        price: 12900,
        mileage: 48000,
        transmission: "manual",
        fuelType: "diesel",
        topSpeed: 190,
        bodyType: "SUV",
        location: "Coventry, United Kingdom",
        title: "2018 Nissan Qashqai dCi N-Connecta – Spacious & Tech-Packed Family SUV",
        engine: "1.5L dCi Turbocharged Diesel Engine",
        drivetrain: "FWD (Front-Wheel Drive)",
        exteriorColor: "Magnetic Red",
        interiorColor: "Anthracite Monoform Cloth Trim",
        images: [
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200"
        ],
        description: "The Nissan Qashqai is the ultimate crossover, combining the rugged ride-height of an SUV with the friendly running costs of a hatchback. This N-Connecta model is highly equipped with safety tech and comfort-driven interior spaces, ideal for school runs and cross-country road trips alike.",
        features: [
            "Smart Vision Pack: Traffic sign recognition, lane departure warning, and emergency braking.",
            "360 Degree Camera: Around View Monitor makes tight parking maneuvers stress-free.",
            "NissanConnect Touchscreen: Built-in satellite navigation, smartphone integration, and Bluetooth.",
            "Panoramic Glass Roof: Sweeping fixed glass roof with an electric sunshade to flood the cabin with light."
        ],
        conditionText: "This Qashqai is in excellent condition, with minor age-related stone chips on the front bumper. The interior fabrics are pristine and free of wear, and all electrical features and driving assists have been fully tested and confirmed operational."
    },
    {
        id: "i20-2024",
        brand: "Hyundai",
        model: "i20",
        year: 2024,
        price: 16500,
        mileage: 4500,
        transmission: "manual",
        fuelType: "hybrid",
        topSpeed: 188,
        bodyType: "Hatchback",
        location: "Coventry, United Kingdom",
        title: "2024 Hyundai i20 T-GDi MHEV Premium – Nearly-New Smart Mild Hybrid",
        engine: "1.0L Turbocharged 3-Cylinder Mild Hybrid (48V) Petrol",
        drivetrain: "FWD (Front-Wheel Drive)",
        exteriorColor: "Atlas White",
        interiorColor: "Black Patterned Cloth with Blue Accents",
        images: [
            "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1200"
        ],
        description: "Enjoy a practically brand-new car experience with this sharp 2024 Hyundai i20. Powered by a fuel-sipping 48-volt mild-hybrid engine, it recaptures energy when decelerating to boost your MPG around city streets. Bold, aggressive design language ensures you stand out.",
        features: [
            "Dual 10.25-inch Screens: High-resolution digital cluster alongside a wide navigation touchscreen.",
            "Mild Hybrid Efficiency: Regenerative braking and seamless auto start-stop to minimize fuel costs.",
            "Heated Steering Wheel & Seats: Premium winter convenience features to keep you cozy instantly."
        ],
        conditionText: "Presented in showroom condition with virtually zero signs of wear. Under manufacturer warranty until 2029 for absolute peace of mind."
    },
    {
        id: "i10-2024",
        brand: "Hyundai",
        model: "i10",
        year: 2024,
        price: 14000,
        mileage: 6200,
        transmission: "automatic",
        fuelType: "gasoline",
        topSpeed: 156,
        bodyType: "Hatchback",
        location: "Coventry, United Kingdom",
        title: "2024 Hyundai i10 Advance – Compact, Effortless City Automatic",
        engine: "1.0L MPi 3-Cylinder Petrol Engine",
        drivetrain: "FWD (Front-Wheel Drive)",
        exteriorColor: "Aurora Grey",
        interiorColor: "Grey/Black Cloth Stitched Interior",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200"
        ],
        description: "The perfect small footprint automatic. This Hyundai i10 makes navigating parking garages and tight avenues a breeze while offering modern connectivity features usually reserved for luxury saloons.",
        features: [
            "Smart Automatic Gearbox: Effortless shifting without a clutch pedal, perfect for stop-start city commutes.",
            "Apple CarPlay & Android Auto: Cast your favorite maps and music applications straight onto the dashboard.",
            "Rear View Camera: Crisp display with active guidelines to slip into tiny spots cleanly."
        ],
        conditionText: "Immaculate condition throughout. Only one previous owner, with full dealership service history and original manufacturer documentation."
    },
    {
        id: "mazda6-2015",
        brand: "Mazda",
        model: "6",
        year: 2015,
        price: 5600,
        mileage: 89000,
        transmission: "manual",
        fuelType: "diesel",
        topSpeed: 210,
        bodyType: "Saloon",
        location: "Coventry, United Kingdom",
        title: "2015 Mazda 6 SKYACTIV-D Sport Nav – Elegant and Athletic Long-Distance Cruiser",
        engine: "2.2L SKYACTIV-D Turbocharged Diesel",
        drivetrain: "FWD (Front-Wheel Drive)",
        exteriorColor: "Soul Red Metallic",
        interiorColor: "Stone Leather Premium Trim",
        images: [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200"
        ],
        description: "The Mazda 6 is highly regarded for being a driver-focused family car. This high-spec Sport Nav trim offers gorgeous cream leather seating, crisp Bose audio system, and a punchy 2.2L engine that glides effortlessly down the highway.",
        features: [
            "Bose Surround Sound: Premium multi-speaker audio layout tuned specifically for the Mazda 6 cabin.",
            "Heated Leather Seats: Fully electric adjustable memory seats wrapped in luxurious stone leather.",
            "Head-Up Display (HUD): Projects your current speed and safety alerts onto your line of sight."
        ],
        conditionText: "Finished in Mazda's iconic Soul Red Metallic. The paint has a lovely depth, with typical motorway stone-chipping on the front valance. Mechanically superb, boasting a freshly stamped service booklet."
    }
];