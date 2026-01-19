# react-geolocation-element

[![NPM Version](https://img.shields.io/npm/v/react-geolocation-element?logo=npm)](https://www.npmjs.com/package/react-geolocation-element)
[![CI](https://github.com/ryohidaka/react-geolocation-element/actions/workflows/ci.yml/badge.svg)](https://github.com/ryohidaka/react-geolocation-element/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight React wrapper for the `<geolocation>` element

## Installation

```bash
npm i react-geolocation-element
```

## Usage

```tsx
import GeoLocation from 'react-geolocation-element';

<GeoLocation
	autolocate
	accuracymode="precise"
	watch
	onLocation={(
		position: GeolocationPosition | null,
		err?: GeolocationPositionError | null,
	) => {
		if (position) {
			console.log(position);
		} else if (err) {
			console.error(err);
		}
	}}
>
	<button
		type="button"
		onClick={() => navigator.geolocation.getCurrentPosition(console.log)}
	>
		Use my location
	</button>
</GeoLocation>
```

## Link

- [Introducing the <geolocation> HTML element](https://developer.chrome.com/blog/geolocation-html-element)

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

MIT
