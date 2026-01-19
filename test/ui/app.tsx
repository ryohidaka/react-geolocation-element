import GeoLocation from '../../src'

export function App() {
	return (
		<GeoLocation
			autolocate
			accuracymode="precise"
			watch
			onLocation={(
				position: GeolocationPosition | null,
				err?: GeolocationPositionError | null,
			) => {
				if (position) {
					console.log(position)
				} else if (err) {
					console.error(err)
				}
			}}
		/>
	)
}

export default App
