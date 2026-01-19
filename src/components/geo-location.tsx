import React, { type PropsWithChildren, useCallback, useRef } from 'react'

export interface GeoLocationProps {
	/** Automatically request location if permission is already granted */
	autolocate?: boolean
	/** Location accuracy mode ("precise" or "approximate") */
	accuracymode?: 'precise' | 'approximate'
	/** Continuously track location updates */
	watch?: boolean
	/** Callback fired when a location or error event occurs */
	onLocation?: (
		position: GeolocationPosition | null,
		error?: GeolocationPositionError | null,
	) => void
	/** Automatically load the polyfill */
	usePolyfill?: boolean
}

/**
 * React wrapper for the `<geolocation>` element
 *
 * - Supports progressive enhancement with custom fallback children.
 * - Optionally loads a polyfill for unsupported browsers.
 *
 * @example
 * ```tsx
 * <GeoLocation
 *   autolocate
 *   accuracymode="precise"
 *   watch
 *   usePolyfill
 *   onLocation={(pos, err) => {
 *     if (pos) console.log("Lat:", pos.coords.latitude, "Lng:", pos.coords.longitude)
 *     if (err) console.error("Error:", err.message)
 *   }}
 * >
 *   <button onClick={() => navigator.geolocation.getCurrentPosition(console.log)}>
 *     Use my location
 *   </button>
 * </GeoLocation>
 * ```
 */
export const GeoLocation: React.FC<PropsWithChildren<GeoLocationProps>> = ({
	autolocate = true,
	accuracymode = 'approximate',
	watch = true,
	onLocation,
	usePolyfill = false,
	children,
}) => {
	const ref = useRef<HTMLElement | null>(null)
	const initialized = useRef(false)

	const handleLocation = useCallback(
		(event: Event) => {
			const target = event.target
			if (!(target instanceof HTMLElement)) return

			const position =
				(target as HTMLElement & { position?: GeolocationPosition }).position ??
				null
			const error =
				(target as HTMLElement & { error?: GeolocationPositionError }).error ??
				null

			onLocation?.(position, error)
		},
		[onLocation],
	)

	const setRef = useCallback(
		(node: HTMLElement | null) => {
			if (ref.current === node) return
			if (ref.current)
				ref.current.removeEventListener('location', handleLocation)

			if (node) {
				node.addEventListener('location', handleLocation)

				if (!initialized.current) {
					initialized.current = true
					if (usePolyfill) {
						import('geolocation-element-polyfill').catch((err) =>
							console.error('[GeoLocation] Failed to load polyfill:', err),
						)
					}
				}
			}

			ref.current = node
		},
		[handleLocation, usePolyfill],
	)

	return React.createElement(
		'geolocation',
		{
			ref: setRef,
			autolocate: autolocate ? '' : undefined,
			accuracymode,
			watch: watch ? '' : undefined,
		},
		children,
	)
}
