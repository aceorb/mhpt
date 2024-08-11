"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { CardHeader } from "@nextui-org/card";
import { useState } from "react";

export default function LoginForm () {
  const [loading, setLoading] = useState(false);
  const handleOAuth = () => {
    setLoading(true);
    window.location.href = `http://localhost:9000/api/auth/callback/google`;
  }

  const handleSubmit= () => {

  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Card className="max-w-[400px]">
        <CardHeader className="flex justify-center gap-3">
          <h1>Login</h1>
        </CardHeader>
        <CardBody className="gap-8">
          <Button onClick={handleOAuth} color="primary" variant="shadow" className="w-32" isLoading={loading}>
            Sign in Google
          </Button>
        </CardBody>
      </Card>
    </form>

)
}

