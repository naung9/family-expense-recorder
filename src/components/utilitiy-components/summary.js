import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './title';
import {useAuth} from "../../services/auth-service";
import IconButton from "@material-ui/core/IconButton";
import {Refresh} from "@material-ui/icons";
import {VictoryPie, VictoryTheme} from "victory";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Summary() {
    const user = useAuth().user;
    const getTotalExpanseThisMonth = () => {
        const date = new Date();
        const search = {
            fromDate: new Date(date.getFullYear(), date.getMonth(), 1),
        }
        const expenses = [];
        const expensesByCategory = expenses.reduce((acc, current) => {
            let totalByCategory = acc.find(item => item.category === current.category);
            if (totalByCategory) totalByCategory.total += current.cost;
            else acc.push({category: current.category, total: current.cost});
            return acc;
        }, []);
        console.log(expensesByCategory);
        return {expensesByCategory, month: date.toLocaleString('default', {month: 'long'}), year: date.getFullYear()}
    };

    const classes = useStyles();
    const {expensesByCategory, month, year} = getTotalExpanseThisMonth();
    let [expenseArr, setExpenseArr] = useState(expensesByCategory);
    let [currentMonth, setCurrentMonth] = useState(month);
    let [currentYear, setCurrentYear] = useState(year);

    return (
        <React.Fragment>
            <Title>This Month <IconButton color={"inherit"} onClick={() => {
                const {expensesByCategory, month, year} = getTotalExpanseThisMonth();
                setExpenseArr(expensesByCategory);
                setCurrentMonth(month);
                setCurrentYear(year);
            }}><Refresh/></IconButton></Title>
                <VictoryPie theme={VictoryTheme.material} data={expenseArr} animate={{duration: 2000}}
                            x={"category"} y={"total"}
                            labelPosition={"centroid"}
                />
            <Typography color="textSecondary" className={classes.depositContext}>
                {`${currentMonth}, ${currentYear}`}
            </Typography>
            {/*<div>*/}
            {/*    <Link color="primary" href="#" onClick={preventDefault}>*/}
            {/*        View balance*/}
            {/*    </Link>*/}
            {/*</div>*/}
        </React.Fragment>
    );
}
