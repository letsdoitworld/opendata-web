import React from 'react';

const AssemblyIntroText = () => (
    <div>
        <h1>Welcome to World Waste Index demo</h1>
        <p>
            The World Waste Map’s main goals are to make mismanaged
            waste (including illegal dumping and littering) visible around the
            globe, and to show the evolution of waste managment around the world.
            To create the World Waste Index, we use an advanced algorythm to assess
            the quality of waste management of countries that includes illegal waste
            in environment, the quanity of waste collected, the recycling rate, what
            kind of waste prevention mechanisms are present, etc.
        </p>
        <p><b>The World Waste Index is divided into two parts:</b></p>
        <ul>
            <li>
                The first part shows the state of the country’s waste management and
                is shown in the current index demo.
            </li>
            <li>
                The second part of the index will be based on the litter data
                collected from data our citizen scientists collect using the
                World Cleanup app. That methodology is still in the development
                and can currently be shown as raw locations of each survey in
                the form of heatmaps.
            </li>
        </ul>
        <p>
            The final index will combine the two parts to indicate the evolution
            of national waste management strategies, and show how much waste
            exists out of the formal system.
        </p>
        <p>
            This is our first demo of the index and we welcome feedback and contributions.
        </p>
        <h2>How is World Waste Index (WWI) calculated?</h2>
        <p>
            The current index is calculated with this formula:
            <br />
            <b>unitGDP/unitMSW * ( 1 + (recycled-composted) % ) * ( 1 – mismanaged % ) </b>
        </p>
        <p><b>Three key components of the calculation:</b></p>
        <ul>
            <li>
                <u>Unit GDP divided by unit municipal waste</u> (MSW): irrespective of how a country
                manages their waste, this represents the &quot;environmental footprint&quot;
                of the production-consumption patterns in a given country
                (intensity in the use of resources).
            </li>
            <li>
                <u>Percentage of recycled-composted waste</u>: this gives the best proxy for
                materials that are recirculating in the economy. For most countries,
                we use the percentage of separately collected, which is closely
                related to recycled-composted.
            </li>
            <li>
                <u>Percentage of uncollected or mismanaged (litter, dumpsites)</u> – it is
                difficult to find consistent data on mismanaged waste from all countries,
                we make our best effort to find institutional datasets that may be more
                or less closely correlated. In lieu of institutional data we will develop
                models of mismanged waste based on citizen science data we collect on litter.
            </li>
        </ul>
    </div>
);
export default AssemblyIntroText;
