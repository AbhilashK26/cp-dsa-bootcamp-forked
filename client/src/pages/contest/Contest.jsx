import * as React from "react";
import "./Contest.css";
import { Button, Tooltip, Box, TextField, Typography, Avatar } from "@mui/material";
import CustomDataGrid from "../../components/customdatagrid/customdatagrid";
import userData from "../../../public/assets/data/data.json";
import { useState, useEffect } from "react";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import useFetchCFcontest from "../../hooks/useFetchCFcontest";
import useFetchCF from "../../hooks/useFetchCF";
// import userData from "../../../public/assets/data/data.json"

var cfUsers = {};
for (let user of userData) {
    if (!user["Codeforce  Handle "] || !user["Leetcode Handle "]) {
        continue;
    }
    if (user["Codeforce  Handle "].includes(" ") || user["Leetcode Handle "].includes(" ")) {
        continue;
    }
    cfUsers[user["Codeforce  Handle "].toLowerCase()] = user.Name;
}

function Hacks({ passed, failed }) {
    return (
        <div className="hacks">
            <div className="passed">+{passed}</div>
            <div style={{ margin: "0.3rem" }}>:</div>
            <div className="failed">-{failed}</div>
        </div>
    );
}

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
        return "candidate-master";
    } else if (2100 <= rating && rating < 2400) {
        return "master";
    } else {
        return "grandmaster";
    }
}

function Question({ name, points }) {
    return (
        <div className="question-header">
            <div className="name">{name}</div>
            <div className="points">{points === 1 ? "" : points}</div>
        </div>
    );
}

function convertSecondsToTime(seconds) {
    if (!seconds) {
        return "--:--";
    }
    // Calculate hours and minutes
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    // Format hours and minutes as strings with leading zeros if necessary
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    // Return the formatted time string
    return `${formattedHours}:${formattedMinutes}`;
}

function ProblemStatus({ props, check }) {
    const r = props.rejectedAttemptCount;
    var points = props.points;
    var clsname = "";

    if (points === 0 && r === 0) {
        clsname = "neutral";
    } else if (points == 0 && r) {
        clsname = "failed";
        points = `-${r}`;
    } else if (points) {
        clsname = "passed";
        points = points === 1 ? `+${r ? r : ""}` : points;
    }
    return (
        <Tooltip title={<Msg msg={r + " wrong attempts"} />} arrow placement="right">
            <div className="problem-status">
                <div className={"points " + clsname}>{points}</div>
                <div className="time">{convertSecondsToTime(props.bestSubmissionTimeSeconds)}</div>
            </div>
        </Tooltip>
    );
}

function Msg({ msg }) {
    return (
        <div className="tooltip-msg" style={{ fontSize: "1rem" }}>
            {msg}
        </div>
    );
}

function getRank(val, actual) {
    var rank =  ["🥇", "🥈", "🥉", "4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]
    return <span>{rank[val - 1]}({actual})</span>;
}

const cfcolumns = [
    {
        field: "id",
        headerName: "Rank",
        width: 100,
        headerClassName: "lb-header",
        resizable: false,
        sortable: false,
        renderCell: (params) => (
            <Tooltip title={<Msg msg={params.value} />} arrow placement="right">
                {params.value <= 10 ? getRank(params.value, params.row.rank) : `${params.value} (${params.row.rank})`}
            </Tooltip>
        ),
    },
    {
        field: "handle",
        headerName: "User Handle",
        width: 250,
        headerClassName: "lb-header",
        sortable: false,
        resizable: false,
        renderCell: (params) => (
            <Tooltip
                title={<Msg msg={CFTag(params.row.rating) + ` ${cfUsers[params.value.toLowerCase()]}`} />}
                arrow
                placement="right"
            >
                <a
                    className={"usr_name usr-" + CFTag(params.row.rating)}
                    href={`https://codeforces.com/profile/${params.value}`}
                >
                    {/* {params.value} */}
                    <div className="usr">
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'var(--text-gradient-1)' }} src={`${params.row.avatar}`}>{params.value[0].toUpperCase()}</Avatar>
                        {params.value}
                    </div>
                </a>
            </Tooltip>
        ),
    },
    {
        field: "points",
        headerName: "Points",
        width: 90,
        sortable: false,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) => (
            <Tooltip title={<Msg msg={params.value} />} arrow placement="right">
                <>{params.value}</>
            </Tooltip>
        ),
    },
    {
        field: "penalty",
        sortable: false,
        headerName: "Penalty",
        width: 90,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) => (
            <Tooltip title={<Msg msg={params.value} />} arrow placement="right">
                <>{params.value}</>
            </Tooltip>
        ),
    },
    {
        field: "hacks",
        headerName: "Hacks",
        width: 100,
        sortable: false,
        headerClassName: "lb-header",
        resizable: false,
        headerAlign: "center",
        renderCell: (params) => (
            <Tooltip title={`Hacks`} arrow placement="right">
                <>
                    <Hacks passed={params.row.successfulHackCount} failed={params.row.unsuccessfulHackCount} />
                </>
            </Tooltip>
        ),
    },
];

const allHandles = [];
for (let user of userData) {
    if (!user["Codeforce  Handle "] || !user["Leetcode Handle "]) {
        continue;
    }
    if (user["Codeforce  Handle "].includes(" ") || user["Leetcode Handle "].includes(" ")) {
        continue;
    }
    allHandles.push(user["Codeforce  Handle "]);
}

const Contest = () => {
    const [ContestID, setContestID] = useState(null);
    const [realColumns, setRealColumns] = useState([]);

    const { data, loading, error, callAPI } = useFetchCFcontest();

    const { data: cfdata, loading: cfloading, error: cferror } = useFetchCF(allHandles);

    const handleRating = {};

    if (cfdata && data) {
        for (let user of cfdata) {
            handleRating[user.handle] = user.rating;
        }
        for (let row of data.contest.rows) {
            row["rating"] = handleRating[row.handle];
        }
    }

    const handleClick = () => {
        callAPI(allHandles, ContestID);
        console.log("DATA WAS FETCHED");
    };

    useEffect(() => {
        let x = [...cfcolumns];
        if (data) {
            data.contest.problems.forEach((Q, i) => {
                x.push({
                    field: Q.id,
                    // headerName: "..",
                    width: 90,
                    headerClassName: "lb-header",
                    resizable: false,
                    sortable: false,
                    headerAlign: "center",
                    renderCell: (params) => <ProblemStatus props={params.row.problemResults[i]} />,
                    renderHeader: () => <Question name={Q.id} points={Q.points} />,
                });
            });
        }
        setRealColumns(x);
    }, [data]);

    // if (loading) {
    //     console.log("Fetching data");
    //     return <Loading />;
    // }

    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            handleClick();
        }
    };

    return (
        <div className="contest-page">
            <div className="heading">
            <span className="h-text">Contest</span> <span className="gradient-text">Standings</span>
            </div>
            <div className="content">
                Enter the CodeForces contest ID and see where you rank among your peers in that contest! Challenge
                yourself, rise through the ranks, and showcase your coding prowess to the world!
                <br />
                Codeforces contest ID is the number that appears in the link of the contest page.
            </div>
            <Box size="large" aria-label="coding website" className="button-group">
                <input
                    className="text-field"
                    onChange={(e) => setContestID(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                <Button className={"table-swap"} size="large" onClick={handleClick}>
                    Show
                </Button>
            </Box>
            <Box>{data && (!error || !cferror) && <Typography variant="h5">{data.contest.name}</Typography>}</Box>
            <Box className="datagrid-wrapper">
                {loading || cfloading ? (
                    <Loading cols={realColumns} />
                ) : error || cferror ? (
                    <Error
                        message={
                            error && error.response
                                ? error.response.data.comment
                                : "Unable to fetch data. Please try again"
                        }
                        error_code={error && error.response ? error.response.request.status : "API error"}
                        cols = {cfcolumns}
                    />
                ) : (
                    data && <CustomDataGrid rows={data.contest.rows} columns={realColumns} toshow={1} />
                )}
            </Box>
        </div>
    );
};

export default Contest;
