
import { NativeBaseProvider, StatusBar } from "native-base";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";


import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";

import { THEME } from "./src/styles/Themes";
import { AuthContextProvider } from "./src/context/AuthContex";

export default function App() {
	const [fontsLoad] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Roboto_700Bold,
	});
	return (
		<NativeBaseProvider theme={THEME}>
			<AuthContextProvider >
				<StatusBar
					barStyle="light-content"
					backgroundColor="transparent"
					translucent
				/>
				{fontsLoad ? <Routes /> : <Loading />}
			</AuthContextProvider>
		</NativeBaseProvider>
	);
}
