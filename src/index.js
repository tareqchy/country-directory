// index.js
import React from 'react'
import ReactDOM from 'react-dom'

import Autocomplete from "./Autocomplete";
require("./autocomplete.css");


const welcome = 'Country Data'
const title = 'Get any country basic information in seconds'


class HeaderSection extends React.Component{
   
    render() {
        return(
        <header>
            <div className='text-center'>
              <h1 className='text-3xl'>{welcome}</h1>
              <h2 className='text-2xl'>{title}</h2>
            </div>
          </header>

        );

    }
}


class CountryData extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      error: null,
      isLoaded: false,
      ctdata: [],
      weatherdata: Array.from(Array(12), () => new Array(3))
    };
    
    
  }

  componentDidUpdate() {

    let countryUrl = 'https://travelbriefing.org/'+this.props.countryName+'?format=json';
    console.log(countryUrl);
   

    fetch(countryUrl)
      .then(res => res.json())
      .then(
        (result) => {
          
          let results = [];
          let weatherdata = [];
          
          let weathers = Array.from(Array(12), () => new Array(3));
    
          results['currencyName'] = result.currency.name;       
          results['currencyRate'] = Number(result.currency.rate).toFixed(2);       
          results['language'] = result.language[0].language;       
          results['timezone'] = result.timezone.name; 

          weatherdata = Object.keys(result.weather).map((key) => result.weather[key]);
          weatherdata.forEach((wdata,index) => {
              weathers[index]['tMax'] = Number(wdata.tMin).toFixed(1);
              weathers[index]['tMin'] = Number(wdata.tMax).toFixed(1);
              weathers[index]['tAvg'] = Number(wdata.tAvg).toFixed(1);
           });
          
          
          this.setState({
            isLoaded: true,
            ctdata: results,
            weatherdata: weathers
          });
         
          
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          
        }
      )
    
  }

  render() {
    
  let cr = this.state.ctdata;
  let wd = this.state.weatherdata;

  if(this.props.countryName!=='')
  {
  return (
    <div className='countryrow bg-white mt-5 p-5'>
    <h2 className='text-3xl text-blue-500'>{this.props.countryName}</h2>
    <h3 className='text-xl mt-5 text-left'>Basic Information</h3>
    <table className='table-collapse border-collapse w-full border-2 border-gray-200'>
      <thead>
        <tr>
        <th className='bg-blue-100 border border-2'>Language:</th>
        <th className='bg-blue-100 border border-2'>Timezone</th>
        <th className='bg-blue-100 border border-2'>Currency</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>{cr['language']}</td>
        <td>{cr['timezone']}</td>
        <td>{cr['currencyName']} (Rate: 1 {cr['currencyName']} =  {cr['currencyRate']} usd)</td>
      </tr>
      </tbody>
    </table>
    <h3 className='text-xl mt-5 text-left'>Weather</h3>
    <table className='table-collapse border-collapse w-full border-1 border-black-200 '>
      <thead>
        <tr>
        <th className='bg-yellow-100 border border-2'>Temperature / Months</th>
        <th className='bg-blue-100 border border-2'>Maximum  (°C)</th>
        <th className='bg-blue-100 border border-2'>Minimum  (°C)</th>
        <th className='bg-blue-100 border border-2'>Average  (°C)</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td className='bg-green-100 border border-2'>January</td>
        <td className='bg-white border border-2'>{wd[0]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[0]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[0]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-200 border border-2'>February</td>
        <td className='bg-white border border-2'>{wd[1]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[1]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[1]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-100 border border-2'>March</td>
        <td className='bg-white border border-2'>{wd[2]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[2]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[2]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-200 border border-2'>April</td>
        <td className='bg-white border border-2'>{wd[3]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[3]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[3]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-100 border border-2'>May</td>
        <td className='bg-white border border-2'>{wd[4]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[4]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[4]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-200 border border-2'>June</td>
        <td className='bg-white border border-2'>{wd[5]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[5]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[5]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-100 border border-2'>July</td>
        <td className='bg-white border border-2'>{wd[6]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[6]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[6]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-200 border border-2'>August</td>
        <td className='bg-white border border-2'>{wd[7]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[7]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[7]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-100 border border-2'>September</td>
        <td className='bg-white border border-2'>{wd[8]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[8]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[8]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-200 border border-2'>October</td>
        <td className='bg-white border border-2'>{wd[9]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[9]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[9]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-100 border border-2'>November</td>
        <td className='bg-white border border-2'>{wd[10]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[10]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[10]['tAvg']}</td>
      </tr>
      <tr>
        <td className='bg-green-200 border border-2'>December</td>
        <td className='bg-white border border-2'>{wd[11]['tMax']}</td>
        <td className='bg-white border border-2'>{wd[11]['tMin']}</td>
        <td className='bg-white border border-2'>{wd[11]['tAvg']}</td>
      </tr>
      </tbody>
      </table>
      <footer>
      <div className='mt-6'>
      <p className='italic'>Coded by <a target='_blank' rel="noreferrer" className='underline text-blue-400 hover:no-underline not-italic' href='https://www.linkedin.com/in/tareqmahmud/'> Tareq Mahmud</a></p>
     </div>
      </footer>
  </div>
  );
  }

  }

}


class CountryDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      error: null,
      isLoaded: false,
      items: []
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  componentDidMount() {
    fetch("https://travelbriefing.org/countries.json")
      .then(res => res.json())
      .then(
        (result) => {
          let results = [];
          result.forEach(function(item, i){
            results[i] = item.name;
          })
         

          this.setState({
            isLoaded: true,
            items: results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          
        }
      )
  }

  render() {
    return (
      <div className='app sm:w-2/3 md:2/3 w-full'>
        <HeaderSection />
        <div className='main-wrapper text-center mt-5'>
        <Autocomplete
        suggestions={this.state.items}
        onFilterTextChange={this.handleFilterTextChange}
      />
        <CountryData 
          countryName={this.state.filterText}
        />
      </div>
      </div> 
      
    );
  }
}


const rootElement = document.getElementById('root')
ReactDOM.render(<CountryDirectory />, rootElement);