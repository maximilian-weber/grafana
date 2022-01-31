package store_test

import (
	"context"
	"testing"

	"github.com/grafana/grafana/pkg/services/ngalert/models"
	"github.com/grafana/grafana/pkg/services/ngalert/store"
	"github.com/grafana/grafana/pkg/services/ngalert/tests"
	"github.com/stretchr/testify/require"
)

const testAlertingIntervalSeconds = 10

func TestProvisioningStore(t *testing.T) {
	_, dbstore := tests.SetupTestEnv(t, testAlertingIntervalSeconds)

	t.Run("Default provenance of a known type is None", func(t *testing.T) {
		rule := models.AlertRule{
			UID: "asdf",
		}

		provenance, err := dbstore.GetProvenance(&rule)

		require.NoError(t, err)
		require.Equal(t, models.ProvenanceNone, provenance)
	})

	t.Run("Store returns saved provenance type", func(t *testing.T) {
		rule := models.AlertRule{
			UID: "123",
		}
		err := dbstore.SetProvenance(&rule, models.ProvenanceFile)
		require.NoError(t, err)

		p, err := dbstore.GetProvenance(&rule)

		require.NoError(t, err)
		require.Equal(t, models.ProvenanceFile, p)
	})

	t.Run("Store saves provenance type when transaction is applied", func(t *testing.T) {
		rule := models.AlertRule{
			UID: "456",
		}
		xact := store.NewTransaction(dbstore.SQLStore)

		xact = dbstore.SetProvenanceTransactional(&rule, models.ProvenanceFile, xact)
		err := xact.Execute(context.Background())
		require.NoError(t, err)

		provenance, err := dbstore.GetProvenance(&rule)
		require.NoError(t, err)
		require.Equal(t, models.ProvenanceFile, provenance)
	})

	t.Run("Transactional store without saving avoids updating type", func(t *testing.T) {
		rule := models.AlertRule{
			UID: "789",
		}
		xact := store.NewTransaction(dbstore.SQLStore)

		xact = dbstore.SetProvenanceTransactional(&rule, models.ProvenanceFile, xact)

		provenance, err := dbstore.GetProvenance(&rule)
		require.NoError(t, err)
		require.Equal(t, models.ProvenanceNone, provenance)
	})
}
