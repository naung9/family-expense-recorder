import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./utilitiy-components/charts";
import Summary from "./utilitiy-components/summary";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {

    },
}));

export default function Dashboard(){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return <>
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={8}>
                <Paper className={fixedHeightPaper}>
                    <Chart />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={4}>
                <Paper className={fixedHeightPaper}>
                    <Summary />
                </Paper>
            </Grid>
            {/* Recent Orders */}
        </Grid>
    </>
}
