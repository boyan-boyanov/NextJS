import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Button from '../../components/ui/button';
import { getAllEvents, getEventById, getFeaturedEvents } from '../../service/api-util';

function EventDetailPage(props) {
    const event = props.selectedEvent;
    console.log(event);

    if (!event) {
        return (
            <Fragment>
                <div className='center'>
                    <h1>Loading...</h1>
                </div>

                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>

        )

    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId
    const event = await getEventById(eventId)
    return {
        props: {
            selectedEvent: event
        },
        //auto-refresh 600sec
     revalidate: 600
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();

    const paths = events.map(event => ({ params: { eventId: event.id } }))
    return {
        paths: paths,
        fallback: true  // more page for prepare
    }
}

export default EventDetailPage