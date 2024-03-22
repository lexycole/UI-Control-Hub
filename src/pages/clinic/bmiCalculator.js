exports.calculateBMI = function (weight, height, weightUnit, heightUnit) {
    if (weight <= 0 || height <= 0) return 0;
    height = (heightUnit == "cm" ? height / 100 : height / 39.37)
    if (weightUnit == "lbs") weight = weight / 2.205

    return parseFloat((weight / (height * height)).toFixed(1))
}

exports.calculateBMICategory = function (value) {
    if (value > 0 && value < 18.5) {
        return "Underweight"
    } else if (value >= 18.5 && value < 25) {
        return "Normal weight"
    } else if (value >= 25 && value < 30) {
        return "Overweight"
    } else if (value >= 30 && value < 40) {
        return "Obesity"
    } else if (value >= 40) {
        return "Class 3 Obesity"
    } else {
        return ""
    }
}