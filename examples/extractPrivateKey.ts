import * as fs from "fs";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

// 从文件中读取私钥数组
function extractPrivateKey() {
  try {
    // 读取devnetUser.json文件
    const rawData = fs.readFileSync("./devnetUser.json", "utf8");

    // 解析JSON数组
    const privateKeyArray = JSON.parse(rawData);

    // 确保是一个有效的数组
    if (!Array.isArray(privateKeyArray) || privateKeyArray.length !== 64) {
      throw new Error("无效的私钥格式，应该是64字节的数组");
    }

    // 将数字数组转换为Uint8Array
    const privateKeyUint8 = new Uint8Array(privateKeyArray);

    // 使用Solana的Keypair从私钥创建密钥对
    const keypair = Keypair.fromSecretKey(privateKeyUint8);

    // 显示不同格式的私钥
    console.log("私钥信息提取成功！");
    console.log("-----------------------------------");
    console.log("公钥 (Base58):", keypair.publicKey.toBase58());
    console.log("-----------------------------------");
    console.log("私钥 (数组格式):", JSON.stringify(Array.from(privateKeyUint8)));
    console.log("-----------------------------------");
    console.log("私钥 (Base58格式):", bs58.encode(privateKeyUint8));
    console.log("-----------------------------------");

    // 将私钥保存到新文件
    const privateKeyBase58 = bs58.encode(privateKeyUint8);
    fs.writeFileSync("./privateKey_base58.txt", privateKeyBase58);
    console.log("私钥已保存到 privateKey_base58.txt 文件");

    return {
      publicKey: keypair.publicKey.toBase58(),
      privateKeyArray: Array.from(privateKeyUint8),
      privateKeyBase58: bs58.encode(privateKeyUint8),
    };
  } catch (error) {
    console.error("提取私钥时出错:", error.message);
    process.exit(1);
  }
}

// 执行提取
extractPrivateKey();
