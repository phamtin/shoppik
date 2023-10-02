import { observable, observe } from '@legendapp/state';

// Create an observable object
const state$ = observable({ settings: { theme: 'dark' } });

// get() returns the raw data
state$.settings.theme.get() === 'dark';

// observe re-runs when any observables change
observe(() => {
	return state$.settings.theme.get();
});

// Assign to state$ with set
state$.settings.theme.set('light');
