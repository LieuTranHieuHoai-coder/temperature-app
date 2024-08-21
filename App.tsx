import { StatusBar } from "expo-status-bar";
import { Text, View, Platform, Linking, Button, NativeModules } from "react-native";
import "./global.css";
import React, { useEffect, useState } from "react";

interface WiFiManager {
  getCurrentSSID(): Promise<string>;
}

interface RCTDeviceInfo {
  getWifiSSID(): Promise<string>;
}
export default function App() {
  const [currentSSID, setCurrentSSID] = useState<string>('');

  useEffect(() => {
    const fetchSSID = async () => {
      try {
        if (Platform.OS === 'ios') {
          const { WiFiManager } = NativeModules as { WiFiManager: WiFiManager };
          const ssid = await WiFiManager.getCurrentSSID();
          setCurrentSSID(ssid);
        } else if (Platform.OS === 'android') {
          const { RCTDeviceInfo } = NativeModules as { RCTDeviceInfo: RCTDeviceInfo };
          const ssid = await RCTDeviceInfo.getWifiSSID();
          setCurrentSSID(ssid);
        }
      } catch (error) {
        console.error('Error getting SSID:', error);
      }
    };

    fetchSSID();
  }, []);

  const handleOpenWifiSettings = () => {
    Linking.openSettings();
  };

  return (
    <>
      <View className="min-h-8"></View>
      <View className="p-4">
        <Text className="text-3xl text-center">
          Setting Temperature Sensor
        </Text>
        <StatusBar style="auto" />
      </View>
      <View className="block rounded-lg p-4 bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
        <View className="border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10">
          <Text className="text-center">Featured</Text>
        </View>
        <View className="p-6">
          <Text className="mb-2 text-xl font-medium leading-tight text-center">
            Special title treatment
          </Text>
          <Text className="mb-4 text-base text-center">
            With supporting text below as a natural lead-in to additional
            content.
          </Text>
          <View>
            <Button
              title="Open WiFi Settings"
              onPress={handleOpenWifiSettings}
            />
          </View>
        </View>
        <View className="border-t-2 border-neutral-100 px-6 py-3 dark:border-white/10 text-surface/75 dark:text-neutral-300">
          <Text className="text-center">Current SSID: {currentSSID ? currentSSID : "No data"} Connected</Text>
        </View>
      </View>
    </>
  );
}
