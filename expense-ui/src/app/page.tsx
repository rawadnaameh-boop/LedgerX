"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

import { apiFetch } from "@/lib/api";

interface Expense {
  id: number;
  title: string;
  amount: number;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const loadExpenses = async () => {
    try {
      const response = await apiFetch("/expenses");

      if (response.status === 401) {
        logout();
        return;
      }

      const data: Expense[] = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    loadExpenses();
  }, []);

  const addExpense = async () => {
    const response = await apiFetch("/expenses", {
      method: "POST",
      body: JSON.stringify({
        title,
        amount: Number(amount),
      }),
    });

    if (response.status === 401) {
      logout();
      return;
    }

    closeDialog();
    loadExpenses();
  };

  const updateExpense = async () => {
    if (editingId === null) return;

    const response = await apiFetch(`/expenses/${editingId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        amount: Number(amount),
      }),
    });

    if (response.status === 401) {
      logout();
      return;
    }

    closeDialog();
    loadExpenses();
  };

  const deleteExpense = async (id: number) => {
    const response = await apiFetch(`/expenses/${id}`, {
      method: "DELETE",
    });

    if (response.status === 401) {
      logout();
      return;
    }

    loadExpenses();
  };

  const openAddDialog = () => {
    setEditingId(null);
    setTitle("");
    setAmount("");
    setOpen(true);
  };

  const openEditDialog = (expense: Expense) => {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount.toString());
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditingId(null);
    setTitle("");
    setAmount("");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Expense Tracker
      </Typography>

      <div style={{ marginBottom: "16px" }}>
        <Button
          variant="contained"
          onClick={openAddDialog}
        >
          Add Expense
        </Button>

        <Button
          color="error"
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={logout}
        >
          Logout
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>

                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => openEditDialog(expense)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    sx={{ ml: 1 }}
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>
          {editingId === null ? "Add Expense" : "Edit Expense"}
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Amount"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={editingId === null ? addExpense : updateExpense}
          >
            {editingId === null ? "Save" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}