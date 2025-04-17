import { Request, Response } from "express";
import { serviceQueue } from "../../utils/queue-config";
import { QueueEvents } from "bullmq";
import { connection } from "../../utils/queue-config";

const cryptoList = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    description: "A decentralized digital currency without a central bank.",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    description: "A blockchain platform with smart contract functionality.",
  },
  {
    name: "Solana",
    symbol: "SOL",
    description: "A high-performance blockchain supporting smart contracts.",
  },
  {
    name: "Ripple",
    symbol: "XRP",
    description: "A digital payment protocol and cryptocurrency.",
  },
];


// Create a QueueEvents instance to listen for job results
const queueEvents = new QueueEvents("serviceQueue", { connection });

export class APIController {
  static async getRandomCrypto(req: Request, res: Response) {
    try {
      const { auth } = req.query;

      // Add job to queue
      const job = await serviceQueue.add("apiservice", { auth });

    //   // Wait for the job to finish (or fail)
      const result = await job.waitUntilFinished(queueEvents);

      if (result?.error) {
        res.status(429).json({ message: result.error });
      }

      // Proceed with response
      const randomIndex = Math.floor(Math.random() * cryptoList.length);
      const crypto = cryptoList[randomIndex];

      const price = parseFloat((Math.random() * 50000 + 100).toFixed(2));
      const change24h = parseFloat((Math.random() * 10 - 5).toFixed(2)); 
      const marketCap = parseFloat(
        (Math.random() * 500_000_000_000 + 10_000_000_000).toFixed(2)
      );
      const circulatingSupply = parseFloat(
        (Math.random() * 100_000_000 + 10_000_000).toFixed(2)
      );
      const maxSupply =
        circulatingSupply + parseFloat((Math.random() * 50_000_000).toFixed(2));

      res.json({
        name: crypto?.name,
        symbol: crypto?.symbol,
        description: crypto?.description,
        price: `$${price}`,
        change24h: `${change24h}%`,
        marketCap: `$${marketCap}`,
        circulatingSupply,
        maxSupply,
        lastUpdated: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({ message: error?.message || "Internal error" });
    }
  }
}
