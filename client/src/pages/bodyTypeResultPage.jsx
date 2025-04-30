import React from "react";
import BodyTypeResult from "./bodyTypeResult.jsx";
import { useParams } from "react-router-dom";

export function BodyTypeResultsPage() {
    const bodyTypeData = {
        // Women
        OvalFemale: {
            title: "Oval/Apple",
            recommendations: [
                "Wear empire waist dresses to elongate your figure.",
                "Choose tops with vertical patterns to slim your torso.",
                "Avoid tight-fitting clothing around the waist.",
            ],
            characteristics: [
                "Waist is about 10% larger than shoulders and hips.",
                "Fuller midsection.",
                "Less defined waistline.",
            ],
        },
        TriangleFemale: {
            title: "Triangle",
            recommendations: [
                "Wear fitted tops to highlight your upper body.",
                "Choose A-line skirts to balance your proportions.",
                "Dark-colored pants can help slim your lower body.",
            ],
            characteristics: [
                "Hips are about 5% larger than shoulders or chest.",
                "Defined waistline.",
                "Smaller upper body.",
            ],
        },
        HourglassFemale: {
            title: "Hourglass",
            recommendations: [
                "Wear fitted clothing to highlight your curves.",
                "Choose wrap dresses to emphasize your waist.",
                "Avoid boxy or shapeless clothing.",
            ],
            characteristics: [
                "Shoulders and hips have a difference of no more than 5%.",
                "Waist is at least 25% smaller than shoulders and hips.",
                "Balanced proportions.",
            ],
        },
        InvertedTriangleFemale: {
            title: "Inverted Triangle",
            recommendations: [
                "Wear A-line skirts to balance your proportions.",
                "Choose tops with V-necks to slim your upper body.",
                "Avoid shoulder pads or puffed sleeves.",
            ],
            characteristics: [
                "Shoulders or chest are 5% larger than hips.",
                "Broader upper body.",
                "Narrower hips.",
            ],
        },
        RectangleFemale: {
            title: "Rectangle",
            recommendations: [
                "Use belts to define your waist.",
                "Wear layered clothing to add dimension.",
                "Choose dresses with a defined waistline.",
            ],
            characteristics: [
                "Shoulders and hips have similar measurements.",
                "Waist difference is no more than 25%.",
                "Straight body shape.",
            ],
        },
    
        // Men
        RectangleMale: {
            title: "Rectangle",
            recommendations: [
                "Wear structured blazers to add definition to your shoulders.",
                "Choose slim-fit pants to elongate your legs.",
                "Avoid overly baggy clothing.",
            ],
            characteristics: [
                "Shoulders and hips have a difference of no more than 5%.",
                "Waist difference is no more than 25% compared to shoulders and hips.",
                "Straight body shape.",
            ],
        },
        TriangleMale: {
            title: "Triangle",
            recommendations: [
                "Wear dark-colored pants to slim your lower body.",
                "Choose tops with horizontal patterns to broaden your shoulders.",
                "Avoid tight-fitting clothing around the hips.",
            ],
            characteristics: [
                "Hips are about 5% larger than shoulders or chest.",
                "Narrower upper body.",
                "Fuller lower body.",
            ],
        },
        InvertedTriangleMale: {
            title: "Inverted Triangle",
            recommendations: [
                "Wear slim-fit pants to balance your proportions.",
                "Choose tops with minimal shoulder padding.",
                "Avoid overly tight tops.",
            ],
            characteristics: [
                "Shoulders or chest are about 25% larger than hips.",
                "Broader upper body.",
                "Narrower lower body.",
            ],
        },
        OvalMale: {
            title: "Oval",
            recommendations: [
                "Wear vertical patterns to elongate your torso.",
                "Choose dark-colored clothing to slim your figure.",
                "Avoid tight-fitting clothing around the waist.",
            ],
            characteristics: [
                "Waist is about 10% larger than shoulders and hips.",
                "Fuller midsection.",
                "Less defined waistline.",
            ],
        },
        TrapezoidMale: {
            title: "Trapezoid",
            recommendations: [
                "Wear fitted shirts to highlight your shoulders.",
                "Choose straight-leg pants to balance your proportions.",
                "Avoid overly loose clothing.",
            ],
            characteristics: [
                "Shoulders and hips have a difference of about 5%.",
                "Hips and waist have similar measurements.",
                "Balanced proportions.",
            ],
        },
    };

    //Obtenemos el tipo de cuerpo desde la api
    const bodyType = useParams();

    // Obtén los datos correspondientes al tipo de cuerpo
    const data = bodyTypeData[bodyType.bodyType] || {
        title: "Unknown",
        recommendations: ["No recommendations available."],
        characteristics: ["No characteristics available."],
    };

    return <BodyTypeResult data={data} />;
}