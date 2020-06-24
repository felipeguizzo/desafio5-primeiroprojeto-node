import Transaction from '../models/Transaction';

interface CreateTransactioDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const allTransactions = this.all();

    const sumIncome = allTransactions
      .filter(x => x.type === 'income')
      .map(x => x.value)
      .reduce((acc, val) => acc + val, 0);

    const filterOutcome = allTransactions.filter(x => x.type === 'outcome');

    let sumOutcome = 0;
    if (filterOutcome.length > 0) {
      // eslint-disable-next-line prettier/prettier
      sumOutcome = filterOutcome.map(x => x.value)
        .reduce((acc, val) => acc + val, 0);
    }
    const sumTotal = sumIncome - sumOutcome;

    return { income: sumIncome, outcome: sumOutcome, total: sumTotal };
  }

  public create({ title, value, type }: CreateTransactioDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
