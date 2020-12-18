package main

import (
	"net/http"
	"time"

	"github.com/gorilla/mux"
	blinkt "github.com/ikester/blinkt"
	"github.com/sirupsen/logrus"
)

const (
	defaultStartColor      = "FF0000"
	defaultPixelBrightness = 0.4
)

func blinktMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		bl := blinkt.NewBlinkt()
		bl.ShowAnimOnStart = false
		bl.ShowAnimOnExit = false
		bl.Setup()
		bl.FlashAll(1, defaultStartColor)
		bl.Show()
		next.ServeHTTP(w, r)
	})
}

func main() {
	r := mux.NewRouter()
	r.Use(blinktMiddleware)
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		logrus.Info("received a request to blink")
		w.WriteHeader(http.StatusOK)
	})

	srv := &http.Server{
		Addr:         "0.0.0.0:80",
		Handler:      r,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	srv.ListenAndServe()
}
