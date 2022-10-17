import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../service/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import { Fragment } from 'react';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEvents(props) {
    const router = useRouter();
    // const filteredData = router.query.slug

    // if (!filteredData) {
    //     return <p className='center'>Loading...</p>
    // }

    // const filteredYear = Number(filteredData[0]);
    // const filteredMonth = Number(filteredData[1]);

    if (props.hasError) {
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

    const filteredEvents = props.events

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

    const date = new Date(props.date.year, props.date.month - 1);

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;

    const filteredData = params.slug;

    const filteredYear = Number(filteredData[0]);
    const filteredMonth = Number(filteredData[1]);

    if (isNaN(filteredYear) || isNaN(filteredMonth) || filteredMonth < 1 || filteredMonth > 12) {
        return {
            props: { hasError: true }
            //notFound: true
            //redirect: {
            //    destination: '/errorPage'
            // }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: filteredYear,
        month: filteredMonth
    })

    return {
        props: {
            events: filteredEvents,
            date: {
                year: filteredYear,
                month: filteredMonth
            }
        }
    }
}

export default FilteredEvents