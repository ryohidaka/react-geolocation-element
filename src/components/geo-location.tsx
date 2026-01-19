import React, { useCallback, useRef } from 'react'

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
}

/**
 * React wrapper for the `<geolocation>` element
 */
export const GeoLocation: React.FC<GeoLocationProps> = ({
	autolocate = true,
	accuracymode = 'approximate',
	watch = true,
	onLocation,
}) => {
	const ref = useRef<HTMLElement | null>(null)

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
			if (node) node.addEventListener('location', handleLocation)
			ref.current = node
		},
		[handleLocation],
	)

	return React.createElement('geolocation', {
		ref: setRef,
		autolocate: autolocate ? '' : undefined,
		accuracymode,
		watch: watch ? '' : undefined,
	})
}
