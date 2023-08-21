import React, {useEffect, useState} from 'react';
import CryptographyService from "../services/CryptographyService.js";
import APIServices from "../services/APIServices.js";
import PseudoTransaction from "../models/PseudoTransaction.js";
import TransactionStatus from "../models/TransactionStatus.js";
import Decimal from 'decimal.js';

const Wallet = ({ apiResponse }) => {
    const [to, setTo] = useState('');
    const [value, setValue] = useState(0);
    const [fees, setFees] = useState(0);
    const [privateKeyAccount, setPrivateKeyAccount] = useState('');
    const [privateKeyTransaction, setPrivateKeyTransaction] = useState('');
    const [showAccount, setAccount] = useState(false);
    const [showTransaction, setTransaction] = useState(false);
    const [publicKey, setPublicKey] = useState('');
    const [wif, setWif] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [pseudoTransaction, setPseudoTransaction] = useState('');
    const [accountBalance, setAccountBalance] = useState(0);
    const [messageClass, setMessageClass] = useState('');

    const parsedResponse = JSON.parse(apiResponse);

    let initialNetworkFees;

    if (parsedResponse == null || parsedResponse.empty) {
        // If parsedResponse is null or has an "empty" property, use the value from local storage or default to 0
        initialNetworkFees = localStorage.getItem('networkFees') || 0;
    } else {
        initialNetworkFees = parsedResponse.networkFees;
    }

    const [networkFees, setNetworkFee] = useState(initialNetworkFees);


    const handleCreatePseudoTransaction = () => {
            if(privateKeyTransaction == null || privateKeyTransaction == '') {
                setShowMessage(true);
                setMessage("Private key could not be null!");
                setMessageClass('ERROR');
            }

            if(to == null || to == '') {
                setShowMessage(true);
                setMessage("Receiver address could not be empty!");
                setMessageClass('ERROR');
            }

            if(value == null || value == '' || value <= 0) {
                setShowMessage(true);
                setMessage("Value must not be empty or negative!");
                setMessageClass('ERROR');
            }

            if(privateKeyTransaction != null && privateKeyTransaction != '') {
                const senderAddress = CryptographyService.convertToAddress("0x".concat(privateKeyTransaction));
                if(senderAddress === to) {
                    setShowMessage(true);
                    setMessage("Receiver address is the same as the sender!");
                    setMessageClass('ERROR');
                }

                //Retrieve account balance
                APIServices.requestAccountBalance(senderAddress)
                    .then((response) => {
                        const apiResponse = response.data;
                        setAccountBalance(apiResponse.balance);

                        const totalFees = new Decimal(networkFees)
                            .add(new Decimal(fees));

                        const totalAmount = new Decimal(value)
                            .add(totalFees);

                        const accountBalanceDecimal = new Decimal(accountBalance);

                        if(accountBalanceDecimal.comparedTo(totalAmount) >= 0) {
                            setShowMessage(true);
                            setMessage((prev) => "Account balance("+accountBalance+") insufficient!");
                            setMessageClass('ERROR');
                        }

                        const feesJSON = {networkFees: networkFees, fees: fees};


                        const pseudoTransaction = new PseudoTransaction();
                        pseudoTransaction.setTo(to);
                        pseudoTransaction.setFrom(apiResponse.address);
                        pseudoTransaction.setVersion(0x16);
                        pseudoTransaction.setStatus(TransactionStatus.PENDING);
                        pseudoTransaction.setNonce(apiResponse.nonce);
                        pseudoTransaction.setFees(feesJSON);
                        pseudoTransaction.setValue(new Decimal(value));
                        pseudoTransaction.setTimeStamp(Date.now());

                        pseudoTransaction.signPseudoTransaction("0x".concat(privateKeyTransaction));

                        console.log(pseudoTransaction.toJSON());

                        APIServices.sendPseudoTransaction(pseudoTransaction.toJSON())
                            .then((transactionApiResponse) => {
                                console.log(transactionApiResponse.data);
                                if(transactionApiResponse.data.result === 'SUCCESS') {
                                    setShowMessage(true);
                                    setMessage((prev) => pseudoTransaction.getPseudoHash());
                                    setMessageClass('SUCCESS');
                                } else {
                                    setShowMessage(true);
                                    setMessage((prev) => pseudoTransaction.getPseudoHash());
                                    setMessageClass('ERROR');
                                }
                            })

                    }).catch((error) => {
                    // Handle error if needed
                    console.error("Error fetching data:", error);
                    });


            }


    };

    const handleClickAccount = () => {
        setAccount((prev) => !prev);// Toggle the showMessage state
        setTransaction((prev) => false);
    };

    const handleClickTransaction = () => {
        setTransaction((prev) => !prev);
        setAccount(() => false);
    }

    const handleCreateAccount = () => {
        CryptographyService
            .createWallet().then(account => {
                setPrivateKeyAccount((prev) => account.getPrivateKey());
                setPublicKey((prev) => account.getAddress());
                setWif((prev) => account.getWif());
        });
    }

    return (
        <div className="absolute flex top-[18rem] left-[22rem]">
            {showMessage && (
                <div className={`font-body absolute top-[-9rem] left-[-8rem] p-2 rounded-md border ${messageClass === 'SUCCESS' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {message}
                </div>
            )}
            <div className="font-body relative text-[1.1rem] flex space-x-10  lg3:w-[23rem] lg:w-[0rem] lg:right-[5rem] ss:right-[10rem] xss:right-[10rem] xs:right-[10rem]">
                <div style={{ display: 'inline-flex' }}>
                    <button className="flex relative top-[-1rem] bg-textcolor text-white px-3 py-2 rounded w-ift" onClick={handleClickAccount}>
                        Create Account
                    </button>
                    {showAccount && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '80px',
                                left: '0px',
                                background: 'white',
                                padding: '4px',
                                display: 'inline-block',
                                border: '1px solid #ccc', // Add a border
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Add a box shadow
                            }}
                        >
                            <h2>Creat new account</h2>
                            <div className="form-group">
                                <label>
                                    Address:
                                    <input type="text"
                                           className="border rounded relative flex px-2 py-2 mr-2 w-[25rem]"
                                           value={publicKey}
                                           readOnly
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Private key:
                                    <input type="text"
                                           className="border rounded relative flex px-2 py-1 mr-1 w-[44rem]"
                                           value={privateKeyAccount}
                                           readOnly
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    WIF:
                                    <input type="text"
                                           className="border rounded relative flex px-2 py-1 mr-1 w-[35rem]"
                                           value={wif}
                                           readOnly
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <button className="flex relative bg-textcolor top-[0.5rem] left-[4.5rem] text-white px-3 py-2 rounded w-ift"
                                        onClick={handleCreateAccount}>Create</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex inline left-[10rem]">
                    <button className="flex relative bg-textcolor top-[-1rem] text-white px-4 py-2 rounded w-ift" onClick={handleClickTransaction}>
                        Send Coins
                    </button>
                    {showTransaction && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '40px',
                                left: '0',
                                background: 'white',
                                padding: '10px',
                                display: 'inline-block',
                            }}
                        >
                            <h2>Send coins</h2>
                            <div className="form-group">
                                <label>
                                    Address:
                                    <input type="text"
                                           className="border rounded relative flex px-2 py-2 mr-2 w-[25rem]"
                                           value={to}
                                           onChange={(e) => setTo(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Value:
                                    <input type="number" className="border rounded relative flex px-4 py-2 mr-2 w-96" value={value} onChange={(e) => setValue(e.target.value)} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Fees:
                                    <input type="number" className="border rounded relative flex px-4 py-2 mr-2 w-96" value={fees} onChange={(e) => setFees(e.target.value)} />
                                    <input
                                        type="text"
                                        className="border rounded relative flex px-4 py-2 mr-2 w-96"
                                        value={networkFees}
                                        readOnly
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Private Key:
                                    <input type="password"
                                           className="border rounded relative flex px-4 py-2 mr-2 w-96"
                                           value={privateKeyTransaction} onChange={(e) => setPrivateKeyTransaction(e.target.value)} />
                                </label>
                            </div>
                            <div className="form-group">
                                <button className="flex relative bg-textcolor text-white px-4 py-2 rounded w-ift" onClick={handleCreatePseudoTransaction}>Sign and send</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Wallet;