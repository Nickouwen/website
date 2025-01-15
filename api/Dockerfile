# Use the official Go image as a builder for compiling the application
FROM golang:1.23.3 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files first (to leverage caching for dependencies)
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application source code into the container
COPY . .

EXPOSE 80

# Build the Go binary
RUN go build

# Command to run the application
CMD ["./api"]
