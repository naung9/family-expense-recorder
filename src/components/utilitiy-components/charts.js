import React, {useState} from 'react';
import Title from './title';
import {VictoryBar, VictoryChart, VictoryStack} from "victory";
import {useAuth} from "../../services/auth-service";
import {MenuItem, Select} from "@material-ui/core";



export default function Chart() {
    const user = useAuth().user;
    const date = new Date();
    let [year, setYear] = useState(date.getFullYear());
    const getExpansesThisYear = (year) => {
        console.log("For year " + year);
        const search = {
            fromDate: new Date(year, 0, 1),
            toDate: new Date(year, 11, 31)
        }
        const expenses = [];
        const expensesByCategory = expenses.reduce((acc, current) => {
            let byCategory = acc.find(item => item.category === current.category);
            if(byCategory){
                let totalByMonth = byCategory.expenses.find(item => item.monthNo === current.submitDate.getMonth() + 1);
                if(totalByMonth) totalByMonth.total += current.cost;
            }else {
                let initData = [
                    {
                        monthNo: 0,
                        month: "Expenses",
                        total: 0
                    },
                    {
                        monthNo: 1,
                        month: "Jan",
                        total: 0
                    },
                    {
                        monthNo: 2,
                        month: "Feb",
                        total: 0
                    },
                    {
                        monthNo: 3,
                        month: "Mar",
                        total: 0
                    },
                    {
                        monthNo: 4,
                        month: "Apr",
                        total: 0
                    },
                    {
                        monthNo: 5,
                        month: "May",
                        total: 0
                    },
                    {
                        monthNo: 6,
                        month: "Jun",
                        total: 0
                    },
                    {
                        monthNo: 7,
                        month: "Jul",
                        total: 0
                    },
                    {
                        monthNo: 8,
                        month: "Aug",
                        total: 0
                    },
                    {
                        monthNo: 9,
                        month: "Sep",
                        total: 0
                    },
                    {
                        monthNo: 10,
                        month: "Oct",
                        total: 0
                    },
                    {
                        monthNo: 11,
                        month: "Nov",
                        total: 0
                    },
                    {
                        monthNo: 12,
                        month: "Dec",
                        total: 0
                    },

                ];
                let totalByMonth = initData.find(item => item.monthNo === current.submitDate.getMonth() + 1);
                if(totalByMonth) totalByMonth.total += current.cost;
                acc.push({category: current.category, expenses: initData});
            }
            return acc;
        }, []);
        console.log(expensesByCategory);
        return expensesByCategory;
    };
    let expenses = getExpansesThisYear(year);
    return (
        <React.Fragment>
            <Title>Total Expenses In <Select id={"year-select"} value={year} onChange={(event) => {
                setYear(event.target.value);
            }}>
                <MenuItem id={'year-1'} value={date.getFullYear()}>{date.getFullYear()}</MenuItem>
                <MenuItem id={'year-2'} value={date.getFullYear() - 1}>{date.getFullYear() - 1}</MenuItem>
                <MenuItem id={'year-3'} value={date.getFullYear() - 2}>{date.getFullYear() - 2}</MenuItem>
                <MenuItem id={'year-4'} value={date.getFullYear() - 3}>{date.getFullYear() - 3}</MenuItem>
                <MenuItem id={'year-5'} value={date.getFullYear() - 4}>{date.getFullYear() - 4}</MenuItem>
                <MenuItem id={'year-6'} value={date.getFullYear() - 5}>{date.getFullYear() - 5}</MenuItem>
                <MenuItem id={'year-7'} value={date.getFullYear() - 6}>{date.getFullYear() - 6}</MenuItem>
                <MenuItem id={'year-8'} value={date.getFullYear() - 7}>{date.getFullYear() - 7}</MenuItem>
                <MenuItem id={'year-9'} value={date.getFullYear() - 8}>{date.getFullYear() - 8}</MenuItem>
                <MenuItem id={'year-10'} value={date.getFullYear() - 9}>{date.getFullYear() - 9}</MenuItem>
            </Select></Title>
            {/*<VictoryChart width={800}>*/}
            {/*    <VictoryBar animate={{duration: 2000}}*/}
            {/*                style={{data: {fill: "red"}}}*/}
            {/*                labels={({datum}) => {*/}
            {/*                    if(datum.monthNo !== 0)*/}
            {/*                    return ''+ datum.total*/}
            {/*                }}*/}
            {/*                x={"month"} y={"total"} data={expenses}/>*/}
            {/*</VictoryChart>*/}
            <VictoryChart width={800}>
            <VictoryStack animate={{duration: 2000}}>
                {
                    expenses.map((expense, index) => <VictoryBar key={`chart-${index}`} x={"month"} y={"total"} data={expense.expenses} />)
                }
            </VictoryStack>
            </VictoryChart>
        </React.Fragment>
    );
}
