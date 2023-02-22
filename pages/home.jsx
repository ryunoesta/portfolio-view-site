import styles from "../styles/Home.module.css";
import { getUser } from "../auth.config";
import { useRouter } from "next/router";
import { ConnectWallet, useAddress, Web3Button } from "@thirdweb-dev/react";
import checkBalance from "../util/checkBalance";

const { logout } = useLogout();

<div className={styles.container}>
      <h1 className={styles.h1}>Welcome to our portfolio page!</h1>
      <p className={styles.explain}>
        ポートフォリオ一覧
      </p>

      <button className={styles.mainButton} onClick={logout}>
        Logout
      </button>
</div>