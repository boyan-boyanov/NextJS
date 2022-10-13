import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data';

function FilteredEvents() {
    const router = useRouter();
    const filteredData = router.query.slug

    if (!filteredData) {
        return <p className='center'>Loading...</p>
    }

    const filteredYear = Number(filteredData[0]);
    const filteredMonth = Number(filteredData[1]);

    if (isNaN(filteredYear) || isNaN(filteredMonth) || filteredMonth < 1 || filteredMonth > 12){
        return <p className='center'>Invalid filter try again</p>
    }

    const filteredEvents = getFilteredEvents({
        year: filteredYear,
        month: filteredMonth
    })

    if(!filteredEvents || filteredEvents.length === 0){
        return <p className='center'>No events Found</p>
    }
        console.log(filteredData);

    return (
        <div>
            <h1>Filtered Events</h1>
        </div>
    )
}

export default FilteredEvents