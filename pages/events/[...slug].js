import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import { Fragment } from 'react';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEvents() {
    const router = useRouter();
    const filteredData = router.query.slug

    if (!filteredData) {
        return <p className='center'>Loading...</p>
    }

    const filteredYear = Number(filteredData[0]);
    const filteredMonth = Number(filteredData[1]);

    if (isNaN(filteredYear) || isNaN(filteredMonth) || filteredMonth < 1 || filteredMonth > 12) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter try again</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>

        )


    }

    const filteredEvents = getFilteredEvents({
        year: filteredYear,
        month: filteredMonth
    })

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events Found</p>
                </ErrorAlert>

                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>

        )
    }

    const date = new Date(filteredYear, filteredMonth - 1);

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    )
}

export default FilteredEvents