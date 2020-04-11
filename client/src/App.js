import React, {useEffect, useState} from 'react';

function App() {
  //This is just a prototype
  const [total, setTotal] = useState(0)
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000")
    .then(res => res.text())
    .then(data => {
      let parser = new DOMParser()
      let doc = parser.parseFromString(data, "text/html")
      let jobPanels = doc.querySelectorAll(".standout")
      let stringTotal = doc.querySelector("#job_count_range").innerHTML
      let result = stringTotal.match(/\d+/g)
      setTotal(Math.max.apply(null, result))
      setJobs(jobPanels)
      jobPanels.forEach(job => console.log(job.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling))
    })
  }, [])
  // const showCompanies = [...companies].map((company, i) => <h5 className="card-title">{company.innerText}</h5>)
  const showJobs = [...jobs].map((job,i) => {
    return (
      <div className="card mb-3" key={i}>
        <div className="card-header">
          <a
            href={job.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.getAttribute("href")}
          >
            {job.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText}
          </a>
        </div>
        <div className="card-body">
          <h5 className="card-title">{job.firstElementChild.firstElementChild.nextElementSibling.innerText}</h5>
          <p className="card-text">
          </p>
        </div>
      </div>
    )
  })

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-3 ">
        <div className="bg-primary text-white p-2 rounded">Keyword: Software Engineer</div>
        <span className="badge badge-light align-items-center d-flex">{total} Jobs using this keyword</span>
      </div>
       {showJobs}
    </div>
  );
}

export default App;
