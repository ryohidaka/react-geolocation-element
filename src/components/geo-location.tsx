import React from 'react'

export interface GeoLocationProps {
	/** Automatically request location if permission is already granted */
	autolocate?: boolean
	/** Location accuracy mode ("precise" or "approximate") */
	accuracymode?: 'precise' | 'approximate'
	/** Continuously track location updates */
	watch?: boolean
}

/**
 * React wrapper for the `<geolocation>` element
 */
export const GeoLocation: React.FC<GeoLocationProps> = ({
	autolocate = true,
	accuracymode = 'approximate',
	watch = true,
}) => {
	return React.createElement('geolocation', {
		autolocate: autolocate ? '' : undefined,
		accuracymode,
		watch: watch ? '' : undefined,
	})
}
