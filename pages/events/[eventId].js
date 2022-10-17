import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Button from '../../components/ui/button';
import { getAllEvents, getEventById } from '../../service/api-util';

function EventDetailPage(props) {
    const event = props.selectedEvent;
    console.log(event);

    if (!event) {
        return (
            <Fragment>
                <ErrorAlert>
                    <h1>Not Event Found</h1>
                </ErrorAlert>

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
        }
    }
}

export async function getStaticPaths() {
    const events = await getAllEvents();

    const paths = events.map(event => ({ params: { eventId: event.id } }))
    return {
        paths: paths,
        fallback: false
    }
}

export default EventDetailPage