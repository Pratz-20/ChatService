  // Function to add a education entry

  function addEducationRow() {
    // Clone the education row template
    const template = document.getElementById('educationRowTemplate').cloneNode(true);
    template.style.display = 'block';

    // Append the cloned row to the education rows container
    const educationRows = document.getElementById('educationRows');
    educationRows.appendChild(template);
  }

  function removeEducationRow(button) {
    // Get the parent row and remove it
    const row = button.closest('.row');
    row.remove();
  }


  // fetch technical skills
  function getTechnicalSkillsInfo() {
    // Collect programming languages with their ratings
    const programmingLanguages = {
      "C++": parseInt(document.getElementById("c++").value || 0),
      "Java": parseInt(document.getElementById("java").value || 0),
      "Python": parseInt(document.getElementById("python").value || 0),
      "JavaScript": parseInt(document.getElementById("js").value || 0),
      "C#": parseInt(document.getElementById("c#").value || 0),
      "Ruby": parseInt(document.getElementById("ruby").value || 0)
    };
  
    // Collect any additional programming languages
    const otherLanguages = document.querySelector('input[aria-label="Others"]').value;
    const otherLanguagesProficiency = parseInt(document.getElementById("inputState").value || 0);
    if (otherLanguages && otherLanguagesProficiency) {
      programmingLanguages[otherLanguages] = otherLanguagesProficiency;
    }
  
    // Collect frameworks
    const frameworks = document.getElementById("frameworks").value.split(",").map(item => item.trim());
  
    // Collect version control systems
    const versionControl = document.getElementById("Version_Control").value.split(",").map(item => item.trim());
  
    // Collect Agile methodologies
    const agileMethodologies = document.getElementById("Agile_meth").value.split(",").map(item => item.trim());
  
    return {
      programmingLanguages,
      frameworks,
      "version-control": versionControl,
      "agileMethodologies": agileMethodologies
    };
  }
  




  // Function to add a work experience entry
function addWorkExperienceEntry() {
  const workExperienceEntryTemplate = document.querySelector('.work-experience-entry');
  const workExperienceEntries = document.getElementById('workExperienceEntries');

  // Clone the work experience entry template
  const newWorkExperienceEntry = workExperienceEntryTemplate.cloneNode(true);
  newWorkExperienceEntry.style.display = ''; // Display the cloned entry

  // Append the cloned entry to the workExperienceEntries container
  workExperienceEntries.appendChild(newWorkExperienceEntry);
}

// Function to remove a work experience entry
function removeWorkExperienceEntry(button) {
  const workExperienceEntry = button.closest('.work-experience-entry');
  workExperienceEntry.remove();
}



  // Function to add a project entry
  function addProjectEntry() {
      const projectEntryTemplate = document.querySelector('.project-entry');
      const projectEntries = document.getElementById('projectEntries');

      // Clone the project entry template
      const newProjectEntry = projectEntryTemplate.cloneNode(true);
      newProjectEntry.style.display = ''; // Display the cloned entry

      // Append the cloned entry to the projectEntries container
      projectEntries.appendChild(newProjectEntry);
  }

  // Function to remove a project entry
  function removeProjectEntry(button) {
      const projectEntry = button.closest('.project-entry');
      projectEntry.remove();
  }



// fetching Education data
function getEducationInfo() {
  const educationRows = document.querySelectorAll('.education-row');
  const educationInfo = [];

  educationRows.forEach(row => {
      const level = row.querySelector('[name="eduLevel"]').value;
      const institution = row.querySelector('[aria-label="Name_of_Institution"]').value;
      const fieldOfStud = row.querySelector('[aria-label="Field_of_Study"]').value;
      const passingYear = row.querySelector('[aria-label="Graduation Year"]').value;
      const grade = row.querySelector('[aria-label="Grade"]').value;

      // Create an object with education information
      if(level || institution ||fieldOfStud || passingYear || grade){
      const education = {
          level: level,
          institution: institution,
          fieldOfStudy: fieldOfStud,
          passingYear: passingYear,
          grade: grade
      };

      // Push the education object to the educationInfo array
      educationInfo.push(education);
    }
  });

  return educationInfo;
}

// Function to get work experience information
function getWorkExperienceInfo() {
  const workExperienceEntries = document.querySelectorAll('.work-experience-entry');
  const workExperienceInfo = [];

  workExperienceEntries.forEach(entry => {
      const companyName = entry.querySelector('[aria-label="Company Name"]').value;
      const jobTitle = entry.querySelector('[aria-label="Job Title"]').value;
      const responsibility = entry.querySelector('[aria-label="Responsibility"]').value;
      const startDate = entry.querySelector('[aria-label="Start Date"]').value;
      const endDate = entry.querySelector('[aria-label="End Date"]').value;
      const reasonForLeaving = entry.querySelector('[aria-label="Reason for Leaving"]').value;

      // Create an object with work experience information
      if (companyName || jobTitle || responsibility || startDate || endDate || reasonForLeaving) {
          const workExperience = {
              company: companyName,
              jobTitle: jobTitle,
              keyResponsibilitiesAndAchievements: responsibility,
              startDate: startDate,
              endDate: endDate,
              reasonForLeaving: reasonForLeaving
          };

          // Push the work experience object to the workExperienceInfo array
          workExperienceInfo.push(workExperience);
      }
  });

  return workExperienceInfo;
}
function getCompensationAndNoticePeriod() {
  
  const currentSalary = document.getElementById('CurrentSalary').value;
  const expectedSalary = document.getElementById('ExpectedSalary').value;
  const noticePeriod = document.getElementById('noticePeriod').value;
  const resigned = document.getElementById('resigned_yes').checked;
  const lastWorkingDay = document.getElementById('lastDay').value;
  const preferredJoiningDate = document.getElementById('preferredJoiningDate').value;
  const noticePeriodNegotiable = document.getElementById('negotiable_yes').checked;

  return {
      currentSalary: parseFloat(currentSalary),
      expectedSalary: parseFloat(expectedSalary),
      noticePeriod: parseInt(noticePeriod),
      resigned,
      lastWorkingDay: resigned ? lastWorkingDay : null,
      preferredJoiningDate,
      noticePeriodNegotiable
  };
}
// fetch project data
function getProjectInfo() {
  const projectEntries = document.querySelectorAll('.project-entry');
  const projectInfo = [];

  projectEntries.forEach(entry => {
      const projectName = entry.querySelector('[aria-label="Project Name"]').value;
      const gitHubLink = entry.querySelector('[aria-label="GitHub Link"]').value;
      const projectDescription = entry.querySelector('[placeholder="Project Description"]').value;

      // Create an object with project information
      if (projectName || gitHubLink || projectDescription) {
      const project = {
          projectName: projectName,
          githubLink: gitHubLink,
          projectDetails: projectDescription
      };

      // Push the project object to the projectInfo array
      projectInfo.push(project);
    }
  });

  return projectInfo;
}

function hideFormAndShowApplyButton() {
  let form = document.getElementById("applicationForm");
  form.style.display = "none"; // Hide the form

  let applyButton = document.getElementById("applyButton");
  applyButton.style.display = "block"; // Show the "Apply for Job" button
}

// async function submitFormAndRedirect() {
//   console.log("Form submission started");
//   try {
//     const responseData = await submitForm(); // Wait for the API call to complete
//     // Redirect on success
//     if (responseData) {
//       window.location.href = 'job-details.html';
//     } else {
//       console.error('API call failed or returned empty response');
//     }
//   } catch (error) {
//     console.error('API call failed:', error);
//     // Handle errors or failed API call scenario
//   }
// }

async function submitFormAndRedirect() {
  console.log("Form submission started");
  try {
    const responseData = await submitForm(); // Wait for the API call to complete
    // Check if the API call was successful
    if (responseData && responseData.status === "OK") {
      console.log(responseData.message); // Log success message
      window.location.href = 'job-details.html'; // Redirect on success
    } else {
      console.error('API call failed or returned empty response');
      // Handle the error scenario or log the message
    }
  } catch (error) {
    console.error('API call failed:', error);
    // Handle errors or failed API call scenario
  }
}
