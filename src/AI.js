import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AI extends Component {
    static propTypes = {
        aiClassName: PropTypes.string,
    };

    static get defaultProps() {
        return {
            aiClassName: this.aiClassName,
        };
    }

/* eslint-disable */
    render() {
        return (
            <div className={this.props.aiClassName}>
                <main className="main-content ai-page">
                    <div className="modal-content">

                        <h1>Let's Do It AI Project</h1>

                        <p className="center">
                            How we've harnessed artificial intelligence to spot trash
                        </p>

                        <p className="center tighter">Trash is everywhere. Left uncollected, it often ends up harming the environment. To clean it up efficiently, we need to focus on the places that are most affected. But how do we know where in the world that is?</p>

                        <p className="center tighter">By combining artificial intelligence with tens of thousands of publicly available photos, we can help solve this problem. We, <a href="https://www.letsdoitworld.org/" target="_blank">Let’s Do It Foundation</a> and <a href="https://sifr.ai/" target="_blank">SIFR</a> in partnership with Microsoft, have developed an AI algorithm for detecting trash in geolocated images. Today, our algorithm is surveying images all over the world, locating trash on a global scale so that our network of cleanup teams can target the worst locations. We are thankful for mentorship from Walter Yu at CalTrans, who inspired its development and for support from Microsoft.</p>

                        <p className="center tighter">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/vOgIjAhoK4o?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </p>

                        <p className="center tighter">This is the story of how we achieved it.</p>
                        
                        <h2>What’s trash, anyway?</h2>

                        <p className="center tighter">Trash is a rather complicated object to detect. Imagine a restaurant table with cans of soda on it, people having fun, eating and drinking. In that context, cans are not trash. BUT, when those cans are on the street, they can most likely be considered trash. </p>
                        
                        <p className="center tighter">This is the main challenge with any image-based trash detection algorithm. Not everything that LOOKS like trash IS trash. Trash is a word people use of an object that lacks purpose, and the purpose of an object is often not obvious in the images we use for teaching an algorithm to spot trash. </p>

                        <h2>The plan</h2>

                        <p className="center tighter">The machine learning project was divided into 5 steps :</p>

                        <p className="center tighter">
                            <ol>
                                <li>Collecting images – Luckily for us, this part was mostly done by the Let’s Do It World foundation and UC Riverside, who are experts at identifying and cleaning up trash. We had thousands of images collected through the World Cleanup App and scraped from Google Street View to use for our model.</li>

                                <li>Selecting images – We strategically chose most of the images that went into the model. We started with a sample of images, trained the model, and analysed the results. Based on the results, we determined what images we had to add to the next iteration of training. </li>
                            
                                <li>Object detection – This step was very time consuming, because it required a lot of manual work: marking all the trash in each of our selected images. We got help from the lovely volunteers from LDIW Foundation and UC Riverside, and all together manually annotated over 1000 images for the model to learn what trash is.</li>
                            
                                <li>Training the machine learning model – This was done multiple times, each time adapting the parameters of the Mask R-CNN model to improve the results and adding new images to the training dataset.</li>
                            
                                <li>Result validation, Testing the training – After each training cycle, the best model was chosen and tested by having it predict trash on test images. These images were not in the training dataset and were used to assess the accuracy of the model. </li>
                            </ol>
                        </p>

                        <p className="center tighter">How did it go? Read on to find out.</p>

                        <h2>Finding the right tool</h2>

                        <p className="center tighter">We started off testing the idea of trash detection with the YOLO (<a href="https://pjreddie.com/darknet/yolo/" target="_blank">You Only Look Once</a>) object detection system in the beginning of March 2019. We selected the initial weights available (tiny yolo) and trained the model to detect only one class: trash. This was done on about 40 images selected from the web. </p>
                        
                        <p className="center tighter">The results were promising, but clearly not enough:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/Screenshot+2019-05-23+at+15.36.19.png" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/Screenshot+2019-05-23+at+15.36.31.png" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/1.png" />

                        <p className="center tighter">For greater precision, we decided to use Mask R-CNN Python implementation (more info on Mask R-CNN: <a href="https://arxiv.org/abs/1703.06870" target="_blank">introductory paper</a>, <a href="https://github.com/matterport/Mask_RCNN" target="_blank">GitHub</a>) to get the benefit of both object detection and segmentation (<a href="https://www.analyticsvidhya.com/blog/2019/04/introduction-image-segmentation-techniques-python/" target="_blank">a good explanation of both</a>). But this required even more manual annotation of the images: since Mask R-CNN uses polygons as its input, this time just dragging a box around trash was not enough. With the help of LDIW volunteers, we started annotating images with the <a href="http://www.robots.ox.ac.uk/~vgg/software/via/" target="_blank">VGG Image Annotator tool</a>.
                        </p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/Screenshot+2019-05-23+at+15.37.04.png" />
                    
                        <p className="center tighter">Selecting what images to annotate and add was done rather methodically. Since annotating takes a lot of time, we started strategically choosing images that would benefit our goal the most.</p>

                        <p className="center tighter">The initial requirements of AI tool to help to detect trash were quite straight forward:</p>

                        <p className="center tighter">
                            <ol>
                                <li>Detect piles of garbage</li>
                                <li>Do not detect humans</li>
                            </ol>
                        </p>

                        <p className="center tighter"><i>As a side note, we continued training the heads of coco weights, because earlier layers detect low level features (edges and corners), and later layers detect higher level features (car, person, cat) and in our case – trash.</i>
                        </p>

                        <p className="center tighter">During the initial testing, it was decided that the model will be trained to detect piles of garbage, rather than single elements of trash on the ground. Our reasoning was that bigger piles are less likely to move (so they may be cleaned up by Let’s Do It World teams), and that trash piles should carry enough characteristics compared to the background to be easily detectable.
                        </p>

                        <h2>Learning what trash is</h2>

                        <p className="center tighter">Unfortunately, in the beginning, our model did not really seem to get the idea of trash. With every new test image, we found new objects that needed to be added to the training dataset to stop the model detecting non-trash objects as trash.</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/giraffes-full-trash.png" />
                        
                        <p className="center tighter">As you can see, the model’s understanding of what trash is was limited to “Mixture of randomly placed colours with no structure on a somewhat solid background”. This means that almost anything too colourful or weird shaped was trash to the model, even if in real life, it was not trash.</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/2019-03-29-legos.png" />

                        <p className="center tighter">Mask R-CNN can teach its models 2 classes: “Trash” and “Background”. For us, this meant that everything we didn't label, the model learned to recognize as background . We started adding images that included “humans and trash”, as well as “trash and cars”, “trash and animals”, “trash and streets” and so on, and the model gradually became better. </p>

                        <p className="center tighter">During our development the model output developed from this:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/2019-03-29-woods.png" />

                        <p className="center tighter">… to this:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/2019-04-01-woods.png" />

                        <p className="center tighter">… to finally this:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/2019-04-03-woods.png" />

                        <p className="center tighter">And from this:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/giraffes-full-trash.png" />

                        <p className="center tighter">… to this:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/giraffe.png" />

                        <p className="center tighter">… to finally this:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/2019-04-03+giraffes+.png" />

                        <h2>Taking it to the streets</h2>

                        <p className="center tighter">At this point we had not yet incorporated the images from Google Street View. Our model was built from a collection of roughly 700 images, of which around 100 were selected from web searches and about 600 taken by volunteers at the Let’s Do It World events.</p> 

                        <p className="center tighter">We trained the model with 115 epochs and 10 steps in each, with learning rate being 0,001. The parameters we set were quite similar to the Balloon example demonstrated on <a href="https://github.com/matterport/Mask_RCNN" target="_blank">https://github.com/matterport/Mask_RCNN</a>.</p>

                        <p className="center tighter">After some rounds of train-validate-repeat, we started testing the model on Google Street View images. We quickly discovered that these images were very different from the ones we had trained the model on. The quality of the images was slightly poorer and there were many image defects due to the fact that they were made on a moving car. </p>

                        <p className="center tighter">There were also some objects that the model had not learned in the previous training: the model did not understand light flares, road surface markings, roadside posts, or the Google Street View car’s camera shadow.</p>

                        <p className="center tighter">Camera shadows are not trash:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/35709.jpg" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/20610.jpg" />

                        <p className="center tighter">Neither are light flares:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/24947.jpg" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/41130.jpg" />

                        <p className="center tighter">Road surface markings are also not trash:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/6971.jpg" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/12575.jpg" />

                        <p className="center tighter">After seeing the mistakes, we added some Google Street View images to the training dataset. We had nearly 50 000 images to choose from, and from these, we made a selection of images that the model had labelled incorrectly. Finally, we had 1300 images in the training dataset. We trained 200 epochs, with 17 steps in each with a learning rate 0,001. </p>
                        
                        <p className="center tighter">The results are now starting to look quite promising.  To finish up the story about where we are now, here are number of positive examples:</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/image30.png" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/image33.png" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/image27.png" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/image31.png" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/image25.png" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/image24.png" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/image23.png" />

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/image28.png" />

                        <h2>Next steps</h2>
                        <p className="center tighter">

                            <ol>
                                <li>Looking for funding and partners with whom to verify our AI solution for the entire world;</li>
                                <li>Assure public access to the source code;</li>
                                <li>Make 1 billion people aware of the trash problem.</li>
                            </ol>

                            We are looking for collaborations with anyone interested in developing the trash detection tool further with Let’s Do It Foundation. Join with us in <a href="http://github.com/letsdoitworld" target="_blank">GitHub</a> or contact with Kristiina Kerge from Let’s Do It Foundation <a target="_blank" href="mailto:kristiina@letsdoitworld.org">kristiina@letsdoitworld.org</a>.
                        </p>

                        <h2>Conclusion</h2>

                        <p className="center tighter">During the process of developing this model, the team has looked through thousands of images that are just full of piles of trash: in the natural environment, on the street, in the sea, in countries around the world. We were able to detect the exact location of mismanaged waste.</p>

                        <p className="center tighter">Here are the examples of locations from USA</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/usa-outline.png" />

                        <p className="center tighter">and Thailand</p>

                        <img className="fluid-image" src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/thailand-outline.png" />

                        <p className="center tighter">We have a big mess to clean up. And we hope that our model can help make the process of cleaning the world easier and faster and help to keep the planet clean.
                        </p>

                        <h2>The Team</h2>

                        <p className="center tighter">
                            <ol>
                                <li>
                                    <img src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/team/K.Kerge+.jpg" className="avatar-image" /><br />
                                    Kristiina Kerge<br />
                                    Tech team lead<br /> 
                                    Let’s Do It Foundation<br />
                                    <a href="mailto:kristiina@letsdoitworld.org" target="_blank">kristiina@letsdoitworld.org</a>
                                </li>
                                
                                <li>
                                    <img src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/team/win.jpg" className="avatar-image" /><br />
                                    Win Cowger<br />
                                    Graduate Student, Environmental Sciences<br /> 
                                    University of California, Riverside<br />
                                </li>
                                
                                <li>
                                    <img src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/team/Kris_Haamer.jpg" className="avatar-image" /><br />
                                    Kris Haamer<br />
                                    Programming the web and creating experiences across media<br />
                                </li>
                                
                                <li>
                                    <img src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/team/Kristin+Ehala.jpg" className="avatar-image" /><br />
                                    Kristin Ehala<br />
                                    Data Scientist
                                </li>

                                <li>
                                    <img src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/team/Kaarel+Kivistik.jpg" className="avatar-image" /><br />
                                    Kaarel Kivistik<br />
                                    AI architect
                                </li>

                                <li>
                                    <img src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/team/Taavi+Tammiste.jpg" className="avatar-image" /><br />
                                    Taavi Tammiste<br />
                                    AI and ML Expert
                                </li>
                                
                                <li>
                                    <img src="https://s3.eu-central-1.amazonaws.com/wwp-assets/images/team/merili.jpg" className="avatar-image" /><br />
                                    Merili Vares<br />
                                    Executive Director<br /> 
                                    Let’s Do It Foundation
                                </li>
                            </ol>
                        </p>

                        <p className="center tighter">For more information please contact with Kristiina Kerge from Let’s Do It Foundation <a href="mailto:kristiina@letsdoitworld.org" target="_blank">kristiina@letsdoitworld.org</a></p>

                    </div>
                </main>
            </div>
        );
    }
} /* eslint-enable */
