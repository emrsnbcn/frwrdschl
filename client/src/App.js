import React, {useEffect, useState} from 'react';

function App() {
  //This is just a prototype
  const [total, setTotal] = useState(0)
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic ZW1yc25iY25AZ21haWwuY29tOkVtZXJzb25iYWNhbmkxNg==");
    myHeaders.append("Cookie", "__cfduid=da6a7799b2ef4b057feeff957fd6917111586567317; LDSESSIONID=0il7p8gjmnbfdt9a7nro6mf7o4; YROTSIH=h%3At%3A%7Bm%3AuE%3A%22QMGU9FP7J_U9UUKML_K8%22%3Bm%3AuA%3A%22EYwB1CWZxyiVknDhBy3zAxVBz6%22%3B%7D; SEARCH_SUMMARY=Software+engineer; ___utmvm=###########; ABSSRP=1531; ABSSRPGroup=A; ABHPGroup=A; ABJDGroup=A; HCRSEABOJ=h%3At%3A%7Bm%3AA%3A%22mhplk2%22%3Bm%3Atu0%3A%22%2B%28Zzim_Voww_nlrn%3AmzVnqh3l%29+%2B%28Zzim_Voww_nlrn%3AlyWYyll3%29+%2B%28mYnlm%3At%29+%2B%283lj3oYnxlyn_VY3x_VwhW%3At%29+%2B%28Zzi_mzo3jl_jzkl%3A%28t+A6+tuC+0tu%29%29%22%3B%7D; TBMCookie_15303015096444475054=386827001586588133L+6mDZ+u/2Pb0zJEq9JnPQjjVyo=; __cfruid=c11fc539eb5ccaafd26a863c86f6d7cc0c6a3fef-1586588133");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://localhost:4000", requestOptions)
    .then(res => res.text())
    .then(data => {
      let parser = new DOMParser()
      let doc = parser.parseFromString(data, "text/html")
      let jobPanels = doc.querySelectorAll(".standout")
      let stringTotal = doc.querySelector("#job_count_range").innerHTML
      let result = stringTotal.match(/\d+/g)
      setTotal(Math.max.apply(null, result))
      setJobs(jobPanels)
      // jobPanels.forEach(job => console.log(job.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling))
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
