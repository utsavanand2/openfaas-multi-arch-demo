FROM --platform=${BUILDPLATFORM:-linux/amd64} golang:1.13 as builder

ARG TARGETPLATFORM
ARG BUILDPLATFORM
ARG TARGETOS
ARG TARGETARCH

ENV GO111MODULE=on
ENV CGO_ENABLED=0

WORKDIR /go/src/github.com/utsavanand2/blinkt
COPY . .

RUN CGO_ENABLED=${CGO_ENABLED} GOOS=${TARGETOS} GOARCH=${TARGETARCH} \
    go build --ldflags "-s -w" -a -o blinktserver .

# release stage
FROM --platform=${TARGETPLATFORM:-linux/amd64} alpine:3.12 as release

LABEL org.opencontainers.image.source https://github.com/utsavanand2/blinkt

RUN apk --no-cache add ca-certificates git

WORKDIR /home/app

COPY --from=builder /go/src/github.com/utsavanand2/blinkt/blinktserver ./blinktserver

ENV HOST=0.0.0.0
ENV PORT=80

EXPOSE 80

ENTRYPOINT ["/home/app/blinktserver"]
