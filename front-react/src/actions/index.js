import loadGoogleMaps from "load-google-maps-api";
import { BACKEND } from '../constants/Config';

import {
  SET_OPERATION_TYPE,
  SET_ROOMS,
  SET_PROPERTY_TYPE,
  SET_GMAPS,
  DELETE_POLYGONS,
  REQUEST_POLYGONS,
  SET_POLYGONS,
  HIDE_DETAILS,
  SHOW_DETAILS,
  REQUEST_PROPERTY_TYPES,
  SET_PROPERTY_TYPES
} from '../constants/actionTypes';

const setOperationType = (operationType) => ({
	type: SET_OPERATION_TYPE,
	operationType
});

const setRooms = (rooms) => ({
	type: SET_ROOMS,
	rooms
});

const setPropertyType = (propertyType) => ({
	type: SET_PROPERTY_TYPE,
	propertyType
});

const deletePolygons = () => ({type: DELETE_POLYGONS});

const requestPolygons = () => ({type: REQUEST_POLYGONS});

const requestPropertyTypes = () => ({type: REQUEST_PROPERTY_TYPES});

const setPolygons = (polygons) => ({
	type: SET_POLYGONS,
	polygons
});

const setPropertyTypes = (propertyTypes) => ({
	type: SET_PROPERTY_TYPES,
	propertyTypes
});

const loadPolygons = () => {
	return (dispatch, getState) => {
		let operationType = getState().filters.operationType;
		let rooms = getState().filters.rooms;
		let propertyType = getState().filters.propertyType;
		dispatch(requestPolygons());
		let url = `${BACKEND}/data/${operationType}?rooms=${rooms}&propertyType=${propertyType}`;
		return fetch(url).then(response => response.json()).then(polygons => {
			dispatch(deletePolygons());
			dispatch(setPolygons(polygons));
		});
	};
};

const loadPropertyTypes = () => {
	return (dispatch) => {
		dispatch(requestPropertyTypes());
		return fetch(BACKEND + '/propertyTypes')
		.then(response => response.json())
		.then(propertyTypes => dispatch(setPropertyTypes(propertyTypes)));
	};
};

export const hideDetails = () => ({type: HIDE_DETAILS});

export const showDetails = (name, value, count, x, y) => ({
	type: SHOW_DETAILS,
	name,
	value,
	count,
	x,
	y
});

export const setGmaps = (gmaps) => ({
	type: SET_GMAPS,
	gmaps
});

export const loadGMaps = () => {
	return (dispatch) => {
		loadGoogleMaps({key: 'AIzaSyB6cuVrCJvwyNos7SsUWZ0D1UjiwwvmiZM'}).then(gmaps => dispatch(setGmaps(gmaps)));
	};
};

export const loadPropertyData = () => {
	return (dispatch) => {
		dispatch(loadPropertyTypes());
		dispatch(loadPolygons());
	};
};

export const changeOperationType = (operationType) => {
	return (dispatch) => {
		dispatch(setOperationType(operationType));
		dispatch(loadPolygons());
	};
};

export const changeRooms = (rooms) => {
	return (dispatch) => {
		dispatch(setRooms(rooms));
		dispatch(loadPolygons());
	};
};

export const changePropertyType = (propertyType) => {
	return (dispatch) => {
		dispatch(setPropertyType(propertyType));
		dispatch(loadPolygons());
	};
};
