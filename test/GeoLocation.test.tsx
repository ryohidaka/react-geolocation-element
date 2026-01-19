import { describe, expect, it, vi } from 'bun:test'
import { render } from '@testing-library/react'
import GeoLocation from '../src'

// Define custom element type for the <geolocation> element
interface GeoLocationElement extends HTMLElement {
	position?: GeolocationPosition
	error?: GeolocationPositionError
}

describe('<GeoLocation />', () => {
	it('renders a <geolocation> element', () => {
		const { container } = render(<GeoLocation />)
		const element = container.querySelector('geolocation')
		expect(element).toBeTruthy()
	})

	it('calls onLocation with position when location event is dispatched', () => {
		const mockHandler = vi.fn()
		const { container } = render(<GeoLocation onLocation={mockHandler} />)
		const element = container.querySelector('geolocation') as GeoLocationElement

		// Mock position and dispatch event
		element.position = {
			coords: { latitude: 35, longitude: 139 },
		} as GeolocationPosition

		element.dispatchEvent(new Event('location'))

		expect(mockHandler).toHaveBeenCalledWith(
			{ coords: { latitude: 35, longitude: 139 } },
			null,
		)
	})

	it('calls onLocation with error when error is set', () => {
		const mockHandler = vi.fn()
		const { container } = render(<GeoLocation onLocation={mockHandler} />)
		const element = container.querySelector('geolocation') as GeoLocationElement

		// Mock error and dispatch event
		element.error = {
			message: 'Permission denied',
		} as GeolocationPositionError

		element.dispatchEvent(new Event('location'))

		expect(mockHandler).toHaveBeenCalledWith(null, {
			message: 'Permission denied',
		})
	})
})
