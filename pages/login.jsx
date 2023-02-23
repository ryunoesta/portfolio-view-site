import { ConnectWallet, useAddress, Web3Button } from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useContract, useNFT, ThirdwebNftMedia } from "@thirdweb-dev/react";
import Image from 'next/image';
import { useUser } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

// replace this with your contract address
const contractAddress = "0xBd14EF16e84e8c6000ea01bF5Ceb9cEfF34D3022";

export default function Login() {
  const address = useAddress(); // Get the user's address

  const {contract} = useContract("0xBd14EF16e84e8c6000ea01bF5Ceb9cEfF34D3022");

  const {data: nft, isloading} =useNFT(contract, 0);

  const { isLoggedIn } = useUser();
  const router = useRouter();
    
      const prevIsLoggedInRef = useRef(isLoggedIn);
    
      useEffect(() => {
        if (prevIsLoggedInRef.current === false && isLoggedIn === true){
          router.push('/');
        }
      prevIsLoggedInRef.current = isLoggedIn;
      }, [isLoggedIn, router]);

  return (
    <div className={styles.container}>
      <Image src="/images/techis-logo.png" width={60} height={60} alt="テックアイエス" /> 
      <h1 className={styles.h1}>認証-NFTゲート</h1>
      <p className={styles.explain}>
        特定のNFTを所有するユーザーに専用コンテンツを提供します。{" "}
      </p>

      <p className={styles.explain}>
        You cannot access the{" "}
        <Link className={styles.purple} href="/">
          main page
        </Link>{" "}
        unless you own particular NFT.
      </p>

      <hr className={styles.divider} />

      <>
        {address ? (
          <p>
            Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        ) : (
          <p>Please connect your wallet to continue.</p>
        )}

        <ConnectWallet accentColor="#F213A4" />

        <div>
            {!isloading && nft?(
                <ThirdwebNftMedia 
                metadata={nft.metadata}
                style={{margin: "25px 0 5px"}}
                />
            ):(
                <p>Loading...</p>
            )}
        </div>

        <p>
          以下のボタンからNFTを受け取れます。
        </p>

        <Web3Button
          contractAddress={contractAddress}
          action={(contract) => contract.erc1155.claim(0, 1)}
          accentColor="#F213A4"
        >
          claim NFT
        </Web3Button>
      </>
    </div>
  );
}


