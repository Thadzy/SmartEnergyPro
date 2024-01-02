import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import ModalDropdown from 'react-native-modal-dropdown';
import ElectricBillCalculator from './ElectricBillCalculator';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#19253D',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    dropdownButton: {
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#FFA800',
        borderRadius: 5,
        color: 'black',
    },
    dataSelectText: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
    },
    chartContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    chartHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: 'black',
    },
    latestDataContainer: {
        marginTop: 20,
        backgroundColor: '#00D8BE',
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    latestDataText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 8,
    },
    HeaderlastetDataText: {
        fontSize: 24,
        fontWeight: 'bold',
    }
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

const EnergyChart = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedData, setSelectedData] = useState<string>('current'); // Default selected data series

    useEffect(() => {
        // Define the Sheety API endpoint URL
        const sheetyApiUrl =
            'https://api.sheety.co/a9ca149997389f43e03f8153fe3b0485/smartEnergyPro/ชีต1';

        // Make an HTTP GET request to fetch data from Sheety
        axios
            .get<{ 'ชีต1': DataItem[] }>(sheetyApiUrl)
            .then((response) => {
                // Extract the data from the response and assume it's sorted in descending order
                const sheetData = response.data['ชีต1']; // Access the 'ชีต1' property

                // Set the data in the state, mark loading as false, and clear any previous errors
                setData(sheetData);
                setLoading(false);
                setError(null);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);

                // Set an error message and mark loading as false
                setError('An error occurred while fetching data.');
                setLoading(false);
            });
    }, []);

    const getDomain = (selectedData: string) => {
        switch (selectedData) {
            case 'voltage':
                return [180, 260] as [number, number];
            case 'current':
                return [0.5, 10.0] as [number, number];
            case 'power':
                return [0, 3000] as [number, number];
            case 'energy':
                return [0, 100] as [number, number];
            case 'frequency':
                return [45, 57] as [number, number];
            default:
                return [0, 1] as [number, number]; // Default domain
        }
    };

    // Get the latest data (assuming data is sorted in descending order)
    const latestData = data.length > 0 ? data[data.length - 1] : null;

    return (
        <View style={styles.container}>
            <Text style={styles.dataSelectText}>Pleases select the data</Text>
            <ModalDropdown
                options={['Voltage', 'Current', 'Power', 'Energy', 'Frequency']}
                defaultValue={selectedData}
                onSelect={(idx, value) => setSelectedData(value)}
                style={styles.dropdownButton}
            />
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>Error: {error}</Text>
            ) : (
                <View style={styles.chartContainer}>
                    <Text style={styles.chartHeader}>Data Series: {selectedData}</Text>
                    <VictoryChart width={350} height={300}>
                        <VictoryAxis
                            label="Time"
                            tickFormat={(tick, index) => {
                                const [hours, minutes] = tick.split(':');
                                if (parseInt(minutes) === 0) {
                                    return `${hours}:${minutes}`;
                                }
                                return '';
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            domain={getDomain(selectedData)}
                        />
                        <VictoryLine
                            data={data}
                            x="time"
                            y={selectedData}
                            style={{
                                data: { stroke: 'red' },
                            }}
                        />
                    </VictoryChart>
                </View>
            )}
            {latestData && (
                <View style={{ ...styles.latestDataContainer, width: '90%' }}>
                    <Text style={styles.latestDataText}>Date: {latestData.date} | Time: {latestData.time}</Text>
                    <Text style={styles.latestDataText}>Voltage: {latestData.voltage} | Energy: {latestData.energy}</Text>
                    <Text style={styles.latestDataText}>Current: {latestData.current} | Frequency: {latestData.frequency}</Text>
                    <Text style={styles.latestDataText}>Power: {latestData.power}</Text>
                </View>
            )}
            <ElectricBillCalculator latestData={latestData} />
        </View>
    );
};

export default EnergyChart;
