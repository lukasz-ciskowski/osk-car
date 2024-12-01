import { router } from '../../router';
import { createPracticalEvent } from './createPracticalEvent';
import { createTheoreticalEvent } from './createTheoreticalEvent';
import { deletePracticalEvent } from './deletePracticalEvent';
import { deleteTheoreticalEvent } from './deleteTheoreticalEvent';
import { getAllEventsForInstructor } from './getAllEventsForInstructor';
import { getAllEventsForStudent } from './getAllEventsForStudent';
import { retrievePracticalEvent } from './retrievePracticalEvent';
import { retrieveTheoreticalEvent } from './retrieveTheoreticalEvent';

export const setupEventRouter = () =>
    router({
        createTheoreticalEvent: createTheoreticalEvent(),
        createPracticalEvent: createPracticalEvent(),
        getAllEventsForStudent: getAllEventsForStudent(),
        getAllEventsForInstructor: getAllEventsForInstructor(),
        retrieveTheoreticalEvent: retrieveTheoreticalEvent(),
        retrievePracticalEvent: retrievePracticalEvent(),
        deleteTheoreticalEvent: deleteTheoreticalEvent(),
        deletePracticalEvent: deletePracticalEvent(),
    });
