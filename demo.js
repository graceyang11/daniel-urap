
// const setData = function(data) {
//   data.left = newLeft;
//   data.right = newRight;

//   console.log(data);
// }
// const trialProperties = [
//   { startLeft: '100px', startTop: '100px', ndcLeft: '200px', ndcTop: '200px', ndbLeft: '300px', ndbTop: '300px' },
//   // Add more properties for each trial as needed
// ];

const draggableBoxTrial = {
  type: 'html-keyboard-response',
  stimulus: '<div id="arena-circle-1" class="arena-circle-1 draggable-element"></div>' +
            '<div id="arena-circle-2" class="arena-circle-2 draggable-element"></div>' +
            '<div id="draggable-box" class="draggable-element"> <div id="draggable-box-content">Place Me</div>  </div>' +
            '<div class="non-draggable-circle draggable-element" id="non-draggable-circle"></div>' +
            '<div class="non-draggable-box draggable-element" id="non-draggable-box"></div>' +
            '<div id="feedback"></div>',
  choices: ['NO_KEYS'],
  on_finish: function(data) {
    console.log('saving now');
    // data.test = feedbacks;
    // data.feedback = feedbacks;
    // data.newLefts = newLefts;
    // data.newTops = newTops;
  },


      
//    data: {startLeft: startleft, startTop: starttop, 
//           ndcleft: nonDraggableCircle.style.left, ndctop: nonDraggableCircle.style.top,
//          ndbleft: nonDraggableBox.style.left, ndbtop: nonDraggableBox.style.top},
    on_load: function() {
      const arenaCircle1 = document.getElementById('arena-circle-1');
      const arenaCircle2 = document.getElementById('arena-circle-2');
      const draggableBox = document.getElementById('draggable-box');
      const nonDraggableCircle = document.getElementById('non-draggable-circle');
      const nonDraggableBox = document.getElementById('non-draggable-box');
      const feedback = document.getElementById('feedback');
      const dropLefts = [];
      const dropTops = [];
      var feedbacks = [];


      // Set initial positions
      arenaCircle1.style.left = -500+2*getRandomPosition() + 'px' //window.innerWidth / 2 + 'px';
      arenaCircle1.style.top = -300+getRandomPosition()+'px' // window.innerHeight / 2 + 'px';
        
      arenaCircle2.style.left = -500+2*getRandomPosition() + 'px'//+window.innerWidth / 2 + 'px' //window.innerWidth / 2 + 'px';
      arenaCircle2.style.top =  -300+getRandomPosition()+'px' // window.innerHeight / 2 + 'px';
    
      draggableBox.style.left = 350+getRandomPosition() + 'px';
      draggableBox.style.top = getRandomPosition() + 'px';

      nonDraggableCircle.style.left = 350+getRandomPosition() + 'px';
      nonDraggableCircle.style.top = getRandomPosition() + 'px';

      nonDraggableBox.style.left = 350+getRandomPosition() + 'px';
      nonDraggableBox.style.top = getRandomPosition() + 'px';
        
      feedback.style.left = window.innerWidth / 2 + 'px';
      feedback.style.top = window.innerHeight / 2 + 'px';
        
      // Set random colors for non-draggable elements
      nonDraggableCircle.style.backgroundColor = getRandomColor();
      nonDraggableBox.style.backgroundColor = getRandomColor();
        
      // draggable box start

      //COMMENTED OUT TEMP
      // jsPsych.data.addDataToLastTrial({ startleft: draggableBox.style.left });
      // jsPsych.data.addDataToLastTrial({ starttop: draggableBox.style.top });
      // // circle start    
      // jsPsych.data.addDataToLastTrial({ ndcleft: nonDraggableCircle.style.left });
      // jsPsych.data.addDataToLastTrial({ ndctop: nonDraggableCircle.style.top });
      // // non draggable box start  
      // jsPsych.data.addDataToLastTrial({ ndbleft: nonDraggableBox.style.left });
      // jsPsych.data.addDataToLastTrial({ ndbtop: nonDraggableBox.style.top });
        
      // draggable box start
//      jsPsych.addData({ startleft: draggableBox.style.left });
//      jsPsych.addData({ starttop: draggableBox.style.top });
//      //circle start    
//      jsPsych.addData({ ndcleft: nonDraggableCircle.style.left });
//      jsPsych.addData({ ndctop: nonDraggableCircle.style.top });
//      //non draggable box start  
//      jsPsych.addData({ ndbleft: nonDraggableBox.style.left });
//      jsPsych.addData({ ndbtop: nonDraggableBox.style.top });
        
      
      

      let isDragging = false;
      let offsetX, offsetY;
      let mouseUpCallCount = 0;

      function handleMouseDown(event) {
        isDragging = true;
        offsetX = event.clientX - draggableBox.getBoundingClientRect().left;
        offsetY = event.clientY - draggableBox.getBoundingClientRect().top;
        draggableBox.style.cursor = 'grabbing';
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }

      function handleMouseMove(event) {
        if (isDragging) {
          const newLeft = event.clientX - offsetX;
          const newTop = event.clientY - offsetY;
          draggableBox.style.left = `${newLeft}px`;
          draggableBox.style.top = `${newTop}px`;
            
          //dropLefts.push(newLeft)
          //dropTops.push(newTop);
//            
          //jsPsych.data.addDataToLastTrial({ newleft: dropLefts });
          //jsPsych.data.addDataToLastTrial({ newtop: dropTops });  
        }
      }

      function handleMouseUp(event) {
        // increment number of drag and drops  
        mouseUpCallCount++;
          
        //log movement data e.g. drop coordinates
        const newLeft = event.clientX - offsetX;
        const newTop = event.clientY - offsetY;
        draggableBox.style.left = `${newLeft}px`;
        draggableBox.style.top = `${newTop}px`;

        dropLefts.push(newLeft)
        dropTops.push(newTop);

        // jsPsych.data.addDataToLastTrial({ newleft: dropLefts });
        // jsPsych.data.addDataToLastTrial({ newtop: dropTops });
//          
//        jsPsych.addData({ newleft: dropLefts });
//        jsPsych.addData({ newtop: dropTops });
//          
        isDragging = false;
        draggableBox.style.cursor = 'grab';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        // Check for overlap
        //if (checkOverlap(draggableBox, nonDraggableBox)) {
        if (isApproximatelyEquidistant(draggableBox,nonDraggableBox,nonDraggableCircle)) {
          feedback.textContent = '+1';
        } else {
          feedback.textContent = '-1';
        }
          
        // Save feedback in the data object
        feedbacks.push(feedback.textContent);

        jsPsych.data.addDataToLastTrial({ feedback: feedbacks });
//        jsPsych.addData({ feedback: feedbacks });
      //   jsPsych.data.addProperties({
      //     feedback: feedbacks,
      //     newLeft: dropLefts,
      //     newTop: dropTops
      //  });
          
        // Print data
        console.log("New Left:", newLeft);
        console.log("New Top:", newTop);
        console.log("Feedbacks:", feedbacks);
        console.log(mouseUpCallCount);

        // Show feedback for 1 second
        setTimeout(() => {
          feedback.textContent = '';
          // End the trial after the second call
        if (mouseUpCallCount >= 2) {
            mouseUpCallCount = 0;
            jsPsych.finishTrial();
        }
        }, 1000);
      }

      draggableBox.addEventListener('mousedown', handleMouseDown);
//      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  // Define the end of experiment trial
  const endTrial = {
    type: 'html-keyboard-response',
    stimulus: '<p>End of Experiment</p>',
    choices: ['v','b','n'], // Disable keyboard response
    response_ends_trial: false,
    trial_duration: 2000, // Display for 2 seconds
  };
  
  // Define the trail between blocks
  const blockTrial = {
    type: 'html-keyboard-response',
    stimulus: '<p>Press [b] when ready for the next block</p>',
    choices: ['v','b','n'],
    trial_duration: null, // Allow the trial to persist until a key is pressed
    response_ends_trial: true,
//    trial_duration: 10000,
   };
    
  const instructionsTrial = {
    type: 'html-keyboard-response',
    stimulus: '<p><font size="+4">On each trial you will see 3 shapes: A light blue square, a black circle and a red square. The other two shapes are fixed, but you can drag and drop the blue square anywhere on the screen. After you drop the shape you will recieve feedback regarding whether you were rewarded for that placement. You will then get a second try to drag and drop again recieving reward feedback. Following your second drop you will move to the next trial where the shapes will appear in new positions. Press "b" if you are ready to move ahead</font></p>',
    choices: ['v','b','n'], // Disable keyboard response
    response_ends_trial: true,
  };

  // Create a timeline with 5 draggable box trials followed by the end trial
  const timeline = [];
  timeline.push(instructionsTrial)
//  timeline.push(blockTrial)
//  timeline.push(instructionsTrial)
//  timeline.push(blockTrial)
  for (let block = 0; block < 2; block++) {
     for (let i = 0; i < 2; i++) { //can adjust i < [# of trials] 
       timeline.push(draggableBoxTrial);

     }
     if (block < 1) { //replace < with == to end trial
       console.log(block);
//       timeline.push(instructionsTrial);
       timeline.push(blockTrial);
       
//       timeline.push(instructionsTrial);
       
     }
   };
    timeline.push(endTrial)
    

    jsPsych.data.addProperties({
      test: 'grace',
    });
    // const properties = trialProperties.shift();

    // const draggableBox = document.getElementById('draggable-box');
    // const nonDraggableCircle = document.getElementById('non-draggable-circle');
    // const nonDraggableBox = document.getElementById('non-draggable-box');

    // // Set initial positions using trial properties
    // draggableBox.style.left = properties.startLeft;
    // draggableBox.style.top = properties.startTop;
    // nonDraggableCircle.style.left = properties.ndcLeft;
    // nonDraggableCircle.style.top = properties.ndcTop;
    // nonDraggableBox.style.left = properties.ndbLeft;
    // nonDraggableBox.style.top = properties.ndbTop;
    
    // jsPsych.data.addProperties(properties);

  // Initialize jsPsych
  jsPsych.init({
    timeline: timeline,
    on_finish: function() {
      // Handle end of experiment, if needed
      // For example, save data or navigate to the next part of the study
      const data = jsPsych.data.get();
      data.test = 'daniel'
      console.log(timeline)
      console.log(data.values()); // You can access the data collected in the experiment
      console.log(window.innerWidth);
      console.log(window.innerHeight);
    }
  });

  // Helper function to check for overlap between two elements
  function checkOverlap(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }
    
  // Helper function to check if shape is approximately equally distant from B and C and not more than fixed distance from the midpoint
  // margin of error -> inf : no checking for distance to elements
  // max distance from midpoint -> inf : no checking for centrality
  function isApproximatelyEquidistant(elementA, elementB, elementC, marginOfError = .5, maxDistanceFromMidpoint = 100) {
  // Get the positions of the elements
  const positionA = {
    x: elementA.getBoundingClientRect().left + elementA.offsetWidth / 2,
    y: elementA.getBoundingClientRect().top + elementA.offsetHeight / 2,
  };
  const positionB = {
    x: elementB.getBoundingClientRect().left + elementB.offsetWidth / 2,
    y: elementB.getBoundingClientRect().top + elementB.offsetHeight / 2,
  };
  const positionC = {
    x: elementC.getBoundingClientRect().left + elementC.offsetWidth / 2,
    y: elementC.getBoundingClientRect().top + elementC.offsetHeight / 2,
  };

  // Calculate the distances between the elements
  const distanceAB = Math.sqrt(Math.pow(positionA.x - positionB.x, 2) + Math.pow(positionA.y - positionB.y, 2));
  const distanceAC = Math.sqrt(Math.pow(positionA.x - positionC.x, 2) + Math.pow(positionA.y - positionC.y, 2));

  // Calculate the expected equidistant distance with the margin of error
  const expectedDistance = (distanceAB + distanceAC) / 2;
  const margin = expectedDistance * marginOfError;

  // Check if the distance between A and B is within the margin of error of the distance between A and C
  const isApproximatelyEquidistant = Math.abs(distanceAB - distanceAC) <= margin;

  // Check if element A is not more than 200px away from the midpoint between B and C
  const midpointX = (positionB.x + positionC.x) / 2;
  const midpointY = (positionB.y + positionC.y) / 2;
  const distanceFromMidpoint = Math.sqrt(Math.pow(positionA.x - midpointX, 2) + Math.pow(positionA.y - midpointY, 2));

  return isApproximatelyEquidistant && distanceFromMidpoint <= maxDistanceFromMidpoint;
}

  // Helper function to get a random position within the window
  function getRandomPosition() {
    const min = 50 //100-(Math.min(window.innerWidth, window.innerHeight)/2) ;//50; // Minimum distance from the edge
    const max = -100+Math.min(window.innerWidth, window.innerHeight);// - 100; // Maximum distance from the edge
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    
  // Helper function to get a random color
  function getRandomColor() {
    const colors = ['#FF6347', '#9370DB', '#32CD32', '#FFD700']; // Add more colors as needed
    return colors[Math.floor(Math.random() * colors.length)];
  }