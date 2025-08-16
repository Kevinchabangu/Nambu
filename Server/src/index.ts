import express = require('express');
import type { Request, Response } from 'express';

const app = express()
const PORT: number = Number(process.env.PORT) || 3000

app.get('/', (req: Request, res: Response): void => {
  res.send('Server is running with TypeScript!')
})

app.listen(PORT, (): void => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
// test lint-staged
