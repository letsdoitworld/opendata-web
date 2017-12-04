import React from 'react';

const AssemblyIntroText = () => (
    <div>
        <h1>Welcome to World Waste Index demo</h1>
        <p>
            The World Waste Platform’s main goal is to make mismanaged waste
            (including illegal dumping and littering) visible around the globe,
            but also to show the evolution of waste management in countries in
            the world. This means illegal waste in environment, a status of
            waste management system, the recycling rate, what kind of waste
            prevention mechanisms are present, etc. The countries will be
            categorised based on a World Waste Index.
        </p>
        <p><b>The World Waste Index is divided into two parts:</b></p>
        <ul>
            <li>
                The first part shows the state of the country’s waste management
                and is shown in the current index demo.
            </li>
            <li>
                The second part of the index will be based on the data collected
                from the waste mappings (using World Cleanup app) and cleanups through
                what is globally known as &quot;citizen science&quot;, and reflect the
                state, location and contents of illegal waste. That methodology is still
                in the development and can currently be shown as raw data in the
                form of heat maps.
            </li>
        </ul>
        <p>
            The final index will combine the two sides, not only to indicate the
            evolution of national waste management strategies, but also show how
            much waste exists out of the formal system and what is the problem in reality.
        </p>
        <h2>How is World Waste Index (WWI) calculated?</h2>
        <p>
            The current index is calculated with the formula:
            <br />
            <b>unitGDP / unitMSW * (1+recycled / composted%) * (1-mismanaged%)</b>
        </p>
        <p><b>We use the three key items:</b></p>
        <ul>
            <li>
                Unit GDP per unit municipal solid waste (MSW) arisings: irrespective of
                whether they are well or poorly managed, they represent the
                &quot;environmental footprint&quot; of the production/consumption patterns
                in a given country (intensity in the use of resources).
            </li>
            <li>
                Percentage of recycled/composted waste: this gives the best proxy
                for materials that are &quot;kept in the loop&quot; of circular economy,
                although it keeps outside materials that are reused (for most
                countries, we use the percentage of separately collected, which
                is closely related to recycled/composted.
            </li>
            <li>
                Percentage of uncollected or mismanaged (litter, dumpsites) –
                much as it might be difficult to find consistent data on waste
                which is mismanaged from all the countries, we will try
                and find datasets that may be more or less closely correlated;
                as a matter of fact, given our focus on fighting littering and
                dumpsites, we consider this a fundamental part in the algorythm
                to draw numerical conclusions in order to show the evolution of
                waste management.
            </li>
        </ul>
    </div>
);
export default AssemblyIntroText;
