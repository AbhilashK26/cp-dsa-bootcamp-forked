import * as React from "react";
import "./leaderboard.css";
import { Button, Tooltip, ButtonGroup, Box } from "@mui/material";
import CustomDataGrid from "../../components/customdatagrid/customdatagrid";
import cf from "../../assets/cf.webp";
import leetcode from "../../assets/leetcode.png";

const cfrows = [
    {
        id: 1,
        username: "ben",
        name: "Ben Ten",
        year: 2,
        contests: 25,
        questions: 120,
        cf_rating: 1400,
        cf_best_rating: 1100,
    },
    {
        id: 2,
        username: "ben",
        name: "Ben Ten",
        year: 2,
        contests: 25,
        questions: 120,
        cf_rating: 1600,
        cf_best_rating: 1200,
    },
    {
        id: 3,
        username: "ben",
        name: "Ben Ten",
        year: 2,
        contests: 25,
        questions: 120,
        cf_rating: 1400,
        cf_best_rating: 1400,
    },
    {
        id: 4,
        username: "ben",
        name: "Ben Ten",
        year: 2,
        contests: 25,
        questions: 120,
        cf_rating: 1400,
        cf_best_rating: 1600,
    },
    {
        id: 5,
        username: "ben",
        name: "Ben Ten",
        year: 2,
        contests: 25,
        questions: 120,
        cf_rating: 1400,
        cf_best_rating: 1900,
    },
    {
        id: 6,
        username: "ben",
        name: "Ben Ten",
        year: 2,
        contests: 25,
        questions: 120,
        cf_rating: 1400,
        cf_best_rating: 2100,
    },
    {
        id: 7,
        username: "ben",
        name: "Ben Ten",
        year: 2,
        contests: 25,
        questions: 120,
        cf_rating: 1400,
        cf_best_rating: 2400,
    },
    {
        id: 8,
        username: "ben",
        name: "Ben Ten",
        year: 2,
        contests: 25,
        questions: 120,
        cf_rating: 1400,
        cf_best_rating: 2600,
    },
];

function CFTag(rating) {
    if (rating < 1200) {
        return "newbie";
    } else if (1200 <= rating && rating < 1400) {
        return "pupil";
    } else if (1400 <= rating && rating < 1600) {
        return "specialist";
    } else if (1600 <= rating && rating < 1900) {
        return "expert";
    } else if (1900 <= rating && rating < 2100) {
        return "candidate-master"
    } else if (2100 <= rating && rating < 2400) {
        return "master"
    } else {
        return "grandmaster"
    }
}

function ratingTag(params) {
    const rating = params.value;
    var classname = CFTag(rating);
    return <div className={"lb " + classname}>{rating}</div>;
}

function GetQuestionStats({ handle }) {
    const [easy, med, hard] = [100, 200, 300];
    return (
        <div className="q-stats">
            <div className="row">
                <div className="level easy">Easy</div>
                <div className="solved">{easy}</div>
            </div>
            <div className="row">
                <div className="level med">Medium</div>
                <div className="solved">{med}</div>
            </div>
            <div className="row">
                <div className="level hard">Hard</div>
                <div className="solved">{hard}</div>
            </div>
        </div>
    );
}

function Msg({ msg }) {
    return (
        <div className="tooltip-msg" style={{ fontSize: "1rem" }}>
            {msg}
        </div>
    );
}

const cfcolumns = [
    {
        field: "id",
        headerName: "#",
        width: 50,
        headerClassName: "lb-header",
        resizable: false,
        sortable: false,
        renderCell: (params) => (
            <Tooltip title={params.value} arrow placement="right">
                {params.value}
            </Tooltip>
        ),
    },
    {
        field: "username",
        headerName: "User Handle",
        width: 200,
        headerClassName: "lb-header",
        sortable: false,
        resizable: false,
        renderCell: (params) => (
            <Tooltip title={<Msg msg={`${CFTag(params.row.cf_rating)} ${params.value}`} />} arrow placement="right">
                <a className="usr_name" href={`https://codeforces.com/profile/${params.value}`}>
                    {params.value}
                </a>
            </Tooltip>
        ),
    },
    {
        field: "year",
        headerName: "Year",
        width: 70,
        sortable: false,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) =>
            `${params.value}${
                params.value === 1 ? "st" : params.value === 2 ? "nd" : params.value === 3 ? "rd" : "th"
            }`,
    },
    {
        field: "contests",
        headerName: "Contests given",
        width: 150,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) => (
            <Tooltip title={params.value} arrow placement="right">
                {params.value}
            </Tooltip>
        ),
    },
    {
        field: "questions",
        headerName: "Qs solved",
        width: 120,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) => (
            <Tooltip title={params.value} arrow placement="right">
                {params.value}
            </Tooltip>
        ),
    },
    {
        field: "cf_rating",
        headerName: "Rating",
        width: 90,
        renderCell: ratingTag,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
    },
    {
        field: "cf_best_rating",
        headerName: "Best Rating",
        width: 120,
        renderCell: ratingTag,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
    },
];
const lccolumns = [
    {
        field: "id",
        headerName: "#",
        width: 50,
        headerClassName: "lb-header",
        resizable: false,
        sortable: false,
        renderCell: (params) => (
            <Tooltip title={params.value} arrow placement="right">
                {params.value}
            </Tooltip>
        ),
    },
    {
        field: "username",
        headerName: "User Handle",
        width: 200,
        headerClassName: "lb-header",
        sortable: false,
        resizable: false,
        renderCell: (params) => (
            <Tooltip title={`${params.value}`} arrow placement="right">
                <a className="usr_name" href={`https://leetcode.com/u/${params.value}`}>
                    {params.value}
                </a>
            </Tooltip>
        ),
    },
    {
        field: "year",
        headerName: "Year",
        width: 70,
        sortable: false,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) =>
            `${params.value}${
                params.value === 1 ? "st" : params.value === 2 ? "nd" : params.value === 3 ? "rd" : "th"
            }`,
    },
    {
        field: "contests",
        headerName: "Contests given",
        width: 150,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) => (
            <Tooltip title={params.value} arrow placement="right">
                {params.value}
            </Tooltip>
        ),
    },
    {
        field: "questions",
        headerName: "Total Qs",
        width: 120,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) => (
            <Tooltip title={<GetQuestionStats handle="__Abhijit__" />} arrow placement="right">
                {params.value}
            </Tooltip>
        ),
    },
    {
        field: "cf_rating",
        headerName: "Rating",
        width: 90,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) => (
            <Tooltip title={params.value} arrow placement="right">
                {params.value}
            </Tooltip>
        ),
    },
    {
        field: "cf_best_rating",
        headerName: "Best Rating",
        width: 120,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) => (
            <Tooltip title={params.value} arrow placement="right">
                {params.value}
            </Tooltip>
        ),
    },
];

const Leaderboard = () => {
    const [show, setShow] = React.useState(1);
    const width = window.innerWidth;
    return (
        <div className="lb-page">
            <div className="heading">
                Know where you <span className="gradient-text">Stand</span>
            </div>
            <div className="content">
                Discover the top coders, track your progress, and compete for the top spot on our dynamic competitive
                programming leaderboard!
            </div>
            <ButtonGroup size="large" aria-label="coding website" className="button-group" orientation={width < 340 ? "vertical":"horizontal"}>
                <Button
                    className={"table-swap " + (show ? "active" : "")}
                    size="large"
                    onClick={() => setShow(1)}
                    startIcon={<img src={cf} className="cf-img" />}
                >
                    Codeforces
                </Button>
                <Button
                    className={"table-swap " + (!show ? "active" : "")}
                    size="large"
                    onClick={() => setShow(0)}
                    endIcon={<img src={leetcode} className="cf-img" />}
                >
                    LeetCode
                </Button>
            </ButtonGroup>
            <Box className="datagrid-wrapper">
                <CustomDataGrid rows={cfrows} columns={cfcolumns} toshow={show} />
                <CustomDataGrid rows={cfrows} columns={lccolumns} toshow={!show} />
            </Box>
        </div>
    );
};

export default Leaderboard;
