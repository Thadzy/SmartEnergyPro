import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    electricBillText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    calculatorContainer: {
        marginTop: 10,
        backgroundColor: '#FF5733', // Set your desired background color
        borderRadius: 16,
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

type DataItem = {
    id: number;
    date: string;
    time: string;
    voltage: number;
    current: number;
    power: number;
    energy: number;
    frequency: number;
};

type ElectricBillCalculatorProps = {
    latestData: DataItem | null;
};

const ElectricBillCalculator: React.FC<ElectricBillCalculatorProps> = ({ latestData }) => {
    // Function to calculate the electric bill
    const calculateElectricBill = (latestData: DataItem | null) => {
        if (!latestData) {
            return 0; // Return 0 if there is no data
        }

        // Assuming the unit rate is 4 Baht per kWh
        const unitRateBahtPerKWh = 4;

        // Calculate the bill by multiplying the energy in kWh with the unit rate
        const electricBill = latestData.energy * unitRateBahtPerKWh;

        return electricBill;
    };

    return (
        <View style={styles.calculatorContainer}>
            {latestData && (
                <Text style={styles.electricBillText}>
                    Electric Bill: {calculateElectricBill(latestData)} Baht
                </Text>
            )}
        </View>
    );
};

export default ElectricBillCalculator;
