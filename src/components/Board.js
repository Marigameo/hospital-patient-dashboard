import React, { Component } from 'react'
import covidCases from '../data/cases'
import '../css/home.css'
import Card from '../components/Card'
import Header from './Header'

export default class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeCases: null,
            inactiveCases: null,
        }
    }

    componentDidMount () {
        // filter active cases from data
        this.getActiveCases()
        this.getInactiveCases()
    }

    getActiveCases = () => {
        const res = covidCases.filter((covidCase) => {
            return covidCase.isActive === true
        })
        console.log('res', res)
        this.setState({ activeCases: res })
    }

    getInactiveCases = () => {
        const res = covidCases.filter((covidCase) => {
            return covidCase.isActive === false
        })
        this.setState({ inactiveCases: res })
    }

    sortActiveCases = () => {
        const activeAfterSort = this.state.activeCases.sort(function (a, b) {
            if (a.name < b.name) { return -1 }
            if (a.name > b.name) { return 1 }
            return 0;
        })
        const inActiveAfterSort = this.state.inactiveCases.sort(function (a, b) {
            if (a.name < b.name) { return -1 }
            if (a.name > b.name) { return 1 }
            return 0;
        })
        this.setState({ activeCases: activeAfterSort, inactiveCases: inActiveAfterSort })
    }

    updateCases = () => {
        this.getActiveCases()
        this.getInactiveCases()
    }

    updateData = (data) => {
        const stateCopy = data.isActive ? this.state.activeCases : this.state.inactiveCases
        const filteredData = stateCopy.findIndex((item) => {
            return item.name === data.name
        })
        stateCopy[filteredData].isActive = !stateCopy[filteredData].isActive
        if (data.isActive) {
            this.setState({ activeCases: stateCopy }, this.updateCases)
        } else {
            this.setState({ inactiveCases: stateCopy }, this.updateCases)
        }
    }

    render () {

        const { activeCases, inactiveCases } = this.state
        console.log('state', this.state)
        if (!activeCases && !inactiveCases) {
            return <h1>Loading...</h1>
        }
        return (
            <div className="container">
                <Header sortActiveCases={this.sortActiveCases} />
                <div className="board">
                    <div className="column">
                        {activeCases.map((item, index) => <Card key={index} item={item} updateData={this.updateData} />)}
                    </div>
                    <div className="column">
                        {inactiveCases.map((item, index) => <Card key={index} item={item} updateData={this.updateData} />)}
                    </div>
                </div>
            </div>
        )
    }
}
