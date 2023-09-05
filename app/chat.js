import { View, Text } from "react-native";
import { Link } from 'expo-router';

export default function Chat(){

    return (
        <View>
            <Text>
                Chattty
            </Text>
            <Link href="/login">
            to chat
        </Link>
        </View>
    )
}