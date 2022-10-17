import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';
import { getAllEvents } from '../../service/api-util';

function Events(props) {
    const router = useRouter();
    const events = props.allEvents;

    function findEventHandler(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }
    return (
        <>
            <EventsSearch onSearch={findEventHandler} />
            <EventList items={events} />
        </>

    )
}

export async function getStaticProps() {
    const allEvents = await getAllEvents();
    return {
        props: {
            allEvents: allEvents
        },
        revalidate: 60
    }
}

export default Events