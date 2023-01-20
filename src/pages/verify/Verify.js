import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
    const tokenn = useParams().token;
    const [msg, setmsg] = useState('');
    const verifyemail = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/verify-email/${tokenn}`).then(d => {
                setmsg(d.data)
            }).catch(e => {
                console.log(e);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                {/* LOGO */}
                <tbody>
                    <tr>
                        <td
                            bgcolor="#FFA73B"
                            align="center"
                            style={{ padding: "0px 10px 0px 10px" }}
                        >
                            <table
                                border={0}
                                cellPadding={0}
                                cellSpacing={0}
                                width="100%"
                                style={{ maxWidth: 600 }}
                            >
                                <tbody>
                                    <tr>
                                        <td
                                            bgcolor="#ffffff"
                                            align="center"
                                            valign="top"
                                            style={{
                                                padding: "40px 20px 20px 20px",
                                                borderRadius: "4px 4px 0px 0px",
                                                color: "#111111",
                                                fontFamily: '"Lato", Helvetica, Arial, sans-serif',
                                                fontSize: 48,
                                                fontWeight: 400,
                                                letterSpacing: 4,
                                                lineHeight: 48
                                            }}
                                        >
                                            <h1 style={{ fontSize: 48, fontWeight: 400, margin: 2 }}>
                                                Verify Email!
                                            </h1>{" "}
                                            <img
                                                src=" https://img.icons8.com/clouds/100/000000/handshake.png"
                                                width={125}
                                                height={120}
                                                style={{ display: "block", border: 0 }}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td
                            bgcolor="#f4f4f4"
                            align="center"
                        >
                            <table
                                border={0}
                                cellPadding={0}
                                cellSpacing={0}
                                width="100%"
                                style={{ maxWidth: 600 }}
                            >
                                <tbody>

                                    <tr>
                                        <td bgcolor="#ffffff" align="left">
                                            <table
                                                width="100%"
                                                border={0}
                                                cellSpacing={0}
                                                cellPadding={0}
                                            >
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            bgcolor="#ffffff"
                                                            align="center"
                                                            style={{ padding: "20px 30px 60px 30px" }}
                                                        >
                                                            <table border={0} cellSpacing={0} cellPadding={0}>
                                                                <tbody>
                                                                    <tr>
                                                                        <td
                                                                            align="center"
                                                                            style={{ borderRadius: 3 }}
                                                                            bgcolor="#FFA73B"
                                                                        >
                                                                            <button
                                                                                className='btn'
                                                                                style={{
                                                                                    fontSize: 20,
                                                                                    fontFamily:
                                                                                        "Helvetica, Arial, sans-serif",
                                                                                    color: "#ffffff",
                                                                                    textDecoration: "none",
                                                                                    padding: "15px 25px",
                                                                                    borderRadius: 2,
                                                                                    border: "1px solid #FFA73B",
                                                                                    display: "inline-block"
                                                                                }}
                                                                                onClick={verifyemail}
                                                                            >
                                                                                Confirm Account
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className=''>
                                                                        <td className='pt-4 text-success text-center'>
                                                                            {msg}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                </tbody>
            </table>
        </>

    )
}

export default Verify